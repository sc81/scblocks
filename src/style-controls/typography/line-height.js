/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import NumberUnit from '../../components/number-unit';

export default function LineHeight( props ) {
	return (
		<NumberUnit
			{ ...props }
			label={ __( 'Line height' ) }
			units={ [ 'px', 'em' ] }
			displayClearButton
		/>
	);
}
