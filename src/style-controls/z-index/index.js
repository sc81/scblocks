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
	const { propValue, onChange } = propertyService( {
		...props,
		propName,
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
