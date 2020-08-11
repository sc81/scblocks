/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import propertyService from '../property-service';
import NumberControl from '../../components/number-control';

const propName = 'opacity';

export default function Opacity( props ) {
	const { propValue, onChange } = propertyService( {
		...props,
		propName,
	} );

	const value = propValue ? parseFloat( propValue ) : '';

	return (
		<NumberControl
			label={ __( 'Opacity', 'scblocks' ) }
			value={ value }
			onChange={ onChange }
			min={ 0 }
			max={ 1 }
			step={ 0.01 }
			hasSlider
			withoutSelectDevices
		/>
	);
}
