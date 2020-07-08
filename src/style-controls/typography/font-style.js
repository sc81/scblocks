/**
 * WordPress dependencies
 */
import { SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { selectControlClass } from './utils';

export default function FontStyle( { value, onChange } ) {
	return (
		<SelectControl
			className={ selectControlClass }
			label={ __( 'Style' ) }
			value={ value }
			options={ [
				{ label: __( 'Default' ), value: '' },
				{ label: __( 'Normal' ), value: 'normal' },
				{ label: __( 'Italic' ), value: 'italic' },
				{ label: __( 'Oblique' ), value: 'oblique' },
			] }
			onChange={ onChange }
		/>
	);
}
