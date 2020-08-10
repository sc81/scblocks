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
			label={ __( 'Line height', 'scblocks' ) }
			units={ [ 'px', 'em' ] }
			displayClearButton
		/>
	);
}
