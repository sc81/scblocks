/**
 * ScBlocks dependencies
 */
import { removeSelectors, setPropsValue } from '@scblocks/css-utils';
import { IconPicker } from '@scblocks/components';
/**
 * Internal dependencies
 */
import { setSelectorActivity } from '../use-selectors-settings';

export default function SelectIcon( props ) {
	const {
		attributes,
		setAttributes,
		devices,
		setSelectorsSettings,
		selectorsSettings,
		iconSelector,
		iconSvgSelector,
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
			selectors: [ iconSelector, iconSvgSelector ],
		} );
		setSelectorsSettings(
			setSelectorActivity( selectorsSettings, iconSelector, false )
		);
		afterRemoveIcon();
	}
	function onSelectIcon( name, iconHTML ) {
		if ( ! iconHTML ) {
			onRemoveIcon();
			return;
		}
		// set initial css
		if ( ! icon ) {
			setPropsValue( {
				attributes,
				setAttributes,
				devices,
				selector: iconSvgSelector,
				props: {
					width: '20px',
					height: '20px',
				},
			} );
		}
		setAttributes( { icon: iconHTML } );

		setSelectorsSettings(
			setSelectorActivity( selectorsSettings, iconSelector, true )
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
