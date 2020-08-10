/**
 * WordPress dependencies
 */
import { RangeControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import propertyService from '../property-service';

const propName = 'opacity';

export default function Opacity( props ) {
	const { propValue, onChange } = propertyService( {
		...props,
		propName,
	} );

	const value = propValue ? parseFloat( propValue ) : undefined;

	return (
		<RangeControl
			label={ __( 'Opacity', 'scblocks' ) }
			value={ value }
			onChange={ onChange }
			min={ 0 }
			max={ 1 }
			step={ 0.01 }
		/>
	);
}
