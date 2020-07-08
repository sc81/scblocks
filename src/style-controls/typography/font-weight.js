/**
 * WordPress dependencies
 */
import { SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { selectControlClass } from './utils';

export default function FontWeight( { value, onChange } ) {
	return (
		<SelectControl
			className={ selectControlClass }
			label={ __( 'Font weight' ) }
			value={ value }
			options={ [
				{ label: __( 'Default' ), value: '' },
				{ label: __( 'Thin (100)' ), value: '100' },
				{ label: __( 'Extra Light (200)' ), value: '200' },
				{ label: __( 'Light (300)' ), value: '300' },
				{ label: __( 'Normal (400)' ), value: '400' },
				{ label: __( 'Medium (500)' ), value: '500' },
				{ label: __( 'Semi Bold (600)' ), value: '600' },
				{ label: __( 'Bold (700)' ), value: '700' },
				{ label: __( 'Extra Bold (800)' ), value: '800' },
				{ label: __( 'Black (900)' ), value: '900' },
			] }
			onChange={ onChange }
		/>
	);
}
