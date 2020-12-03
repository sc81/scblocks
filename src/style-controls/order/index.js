/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * ScBlocks dependencies
 */
import { NumberControl } from '@scblocks/components';

/**
 * Internal dependencies
 */
import propertyService from '../property-service';

export default function Order( props ) {
	const { propValue, onChange } = propertyService( {
		...props,
		propName: 'order',
	} );
	return (
		<NumberControl
			label={ __( 'Order', 'scblocks' ) }
			value={ propValue }
			onChange={ onChange }
			min={ -50 }
			max={ 50 }
		/>
	);
}
