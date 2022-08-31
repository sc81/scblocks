/**
 * ScBlocks dependencies
 */
import { removeSelectors } from '@scblocks/css-utils';
import { IconPicker } from '@scblocks/components';
/**
 * Internal dependencies
 */
import { setSelectorActivity } from '../use-selectors-settings';

export default function SelectIcon( props ) {
	const {
		attributes,
		setAttributes,
		setSelectorsSettings,
		selectorsSettings,
		selectorAlias,
		afterRemoveIcon = () => {},
	} = props;
	const { icon } = attributes;

	function onRemoveIcon() {
		setAttributes( {
			icon: '',
		} );
		removeSelectors( {
			attributes,
			setAttributes,
			selectors: [ selectorAlias ],
		} );
		setSelectorsSettings(
			setSelectorActivity( selectorsSettings, selectorAlias, false )
		);
		afterRemoveIcon();
	}
	function onSelectIcon( name, iconHTML ) {
		if ( ! iconHTML ) {
			onRemoveIcon();
			return;
		}
		setAttributes( { icon: iconHTML } );

		setSelectorsSettings(
			setSelectorActivity( selectorsSettings, selectorAlias, true )
		);
	}
	return (
		<IconPicker
			icon={ icon }
			onSelect={ onSelectIcon }
			onClear={ onRemoveIcon }
		/>
	);
}
