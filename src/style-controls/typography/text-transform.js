/**
 * WordPress dependencies
 */
import { SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { selectControlClass } from './utils';

export default function TextTransform( { value, onChange } ) {
	return (
		<SelectControl
			className={ selectControlClass }
			label={ __( 'Transform' ) }
			value={ value }
			options={ [
				{ label: __( 'Default' ), value: '' },
				{ label: __( 'Uppercase' ), value: 'uppercase' },
				{ label: __( 'Lowercase' ), value: 'lowercase' },
				{ label: __( 'Capitalize' ), value: 'capitalize' },
				{ label: __( 'Normal' ), value: 'normal' },
			] }
			onChange={ onChange }
		/>
	);
}
