/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import propertyService from '../property-service';
import OpenColorPicker from '../../components/open-color-picker';

export default function Color( props ) {
	const { propValue, onChange } = propertyService( props );

	return (
		<OpenColorPicker
			label={ props.label || __( 'Color' ) }
			value={ propValue }
			onChange={ onChange }
		/>
	);
}
