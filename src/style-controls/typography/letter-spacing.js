/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import NumberUnit from '../../components/number-unit/index';

export default function LetterSpacing( { value, onChange } ) {
	return (
		<NumberUnit
			label={ __( 'Letter spacing' ) }
			value={ value }
			onChange={ onChange }
			units={ [ 'px' ] }
			unitRangeStep={ {
				px: {
					min: -5,
					max: 10,
					step: 0.1,
				},
			} }
		/>
	);
}
