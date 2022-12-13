/**
 * WordPress dependencies
 */
import { useSelect } from '@wordpress/data';

/**
 * ScBlocks dependencies
 */
import { CORE_EDIT_POST_STORE_NAME } from '@scblocks/constants';
/**
 * Internal dependencies
 */
import useBlockMemo from './use-block-memo';
import useDynamicCss from './use-dynamic-css';
import { useSelectorsSettings } from './use-selectors-settings';
import useItemClass from './use-item-class';
import getUidClass from './get-uid-class';

export default function useRequiredProps( props, getSelectorsSettings ) {
	const { attributes, name, clientId } = props;
	const devices = useSelect(
		( select ) =>
			select( CORE_EDIT_POST_STORE_NAME )
				.__experimentalGetPreviewDeviceType()
				.toLowerCase(),
		[]
	);
	const [ selectorsSettings, setSelectorsSettings ] = useSelectorsSettings(
		getSelectorsSettings,
		name,
		props
	);

	return {
		devices,
		selectorsSettings,
		setSelectorsSettings,
		blockMemo: useBlockMemo( attributes, selectorsSettings ),
		style: useDynamicCss( props, devices ),
		itemClass: useItemClass( clientId ),
		uidClass: getUidClass( name, clientId ),
	};
}
