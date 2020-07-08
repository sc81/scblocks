/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import NumberUnit from '../../components/number-unit';

export default function LineHeight( { value, onChange } ) {
	return (
		<NumberUnit
			label={ __( 'Line height' ) }
			value={ value }
			onChange={ onChange }
			units={ [ 'px', 'em' ] }
		/>
	);
}
