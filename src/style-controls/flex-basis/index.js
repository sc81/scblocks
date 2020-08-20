/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
/**
 * Internal dependencies
 */
import propertyService from '../property-service';
import NumberUnit from '../../components/number-unit';

export default function FlexBasis( props ) {
	const { propValue, onChange } = propertyService( {
		...props,
		propName: 'flexBasis',
	} );
	return (
		<NumberUnit
			label={ __( 'Flex-basis', 'scblocks' ) }
			value={ propValue }
			onChange={ onChange }
			displayClearButton={ !! propValue }
			onClear={ () => onChange( '' ) }
			units={ [ '%' ] }
			unitRangeStep={ {
				'%': {
					min: 10,
					step: 1,
				},
			} }
		/>
	);
}
