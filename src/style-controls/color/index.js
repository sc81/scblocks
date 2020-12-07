/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * ScBlocks dependencies
 */
import { OpenColorPicker } from '@scblocks/components';

/**
 * Internal dependencies
 */
import propertyService from '../property-service';

export default function Color( props ) {
	const { propValue, onChange } = propertyService( props );

	return (
		<OpenColorPicker
			label={ props.label || __( 'Color', 'scblocks' ) }
			value={ propValue }
			onChange={ onChange }
		/>
	);
}
