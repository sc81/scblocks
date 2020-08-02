/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import NumberUnit from '../../components/number-unit/index';

export default function LetterSpacing( props ) {
	return (
		<NumberUnit
			{ ...props }
			label={ __( 'Letter spacing' ) }
			units={ [ 'px' ] }
			unitRangeStep={ {
				px: {
					min: -5,
					max: 10,
					step: 0.1,
				},
			} }
			displayClearButton
		/>
	);
}
