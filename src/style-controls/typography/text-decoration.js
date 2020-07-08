/**
 * WordPress dependencies
 */
import { SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { selectControlClass } from './utils';

export default function TextDecoration( { value, onChange } ) {
	return (
		<SelectControl
			className={ selectControlClass }
			label={ __( 'Decoration' ) }
			value={ value }
			options={ [
				{ label: __( 'Default' ), value: '' },
				{ label: __( 'Underline' ), value: 'underline' },
				{ label: __( 'Overline' ), value: 'overline' },
				{ label: __( 'Line-through' ), value: 'line-through' },
				{ label: __( 'None' ), value: 'none' },
			] }
			onChange={ onChange }
		/>
	);
}
