/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import NumberUnit from '../../components/number-unit/index';

export default function FontSize( { value, onChange } ) {
	return (
		<NumberUnit
			label={ __( 'Size' ) }
			value={ value }
			onChange={ onChange }
			units={ [ 'px', 'em', 'rem', 'vw' ] }
		/>
	);
}
