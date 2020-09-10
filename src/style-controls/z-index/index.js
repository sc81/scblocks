/**
 * WordPress dependencies
 */
import { TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import propertyService from '../property-service';
import { ALL_DEVICES } from '../../constants';

const propName = 'zIndex';

export default function Zindex( props ) {
	let { selector } = props;
	const zIndexSelector =
		props.selectorSettings.allowedPanels.placement.zIndex.selector;
	selector =
		( typeof zIndexSelector === 'string' && zIndexSelector ) || selector;

	const { propValue, onChange } = propertyService( {
		...props,
		propName,
		selector,
		devices: ALL_DEVICES,
	} );

	return (
		<TextControl
			label={ __( 'Z-index', 'scblocks' ) }
			value={ propValue }
			onChange={ onChange }
			type="number"
			autocomplete="off"
		/>
	);
}
