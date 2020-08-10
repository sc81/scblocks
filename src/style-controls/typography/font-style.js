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
			label={ __( 'Style', 'scblocks' ) }
			value={ value }
			options={ [
				{ label: __( 'Default', 'scblocks' ), value: '' },
				{ label: __( 'Normal', 'scblocks' ), value: 'normal' },
				{ label: __( 'Italic', 'scblocks' ), value: 'italic' },
				{ label: __( 'Oblique', 'scblocks' ), value: 'oblique' },
			] }
			onChange={ onChange }
		/>
	);
}
