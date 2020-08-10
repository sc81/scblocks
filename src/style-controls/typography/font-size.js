/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import NumberUnit from '../../components/number-unit/index';

export default function FontSize( props ) {
	return (
		<NumberUnit
			{ ...props }
			label={ __( 'Size', 'scblocks' ) }
			units={ [ 'px', 'em', 'rem', 'vw' ] }
			displayClearButton
			unitRangeStep={ {
				vw: {
					min: 0,
					max: 20,
					step: 0.1,
				},
			} }
		/>
	);
}
