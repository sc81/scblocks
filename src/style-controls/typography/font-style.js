/**
 * WordPress dependencies
 */
import { SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export default function FontStyle( { value, onChange } ) {
	return (
		<SelectControl
			label={ __( 'Font Style', 'scblocks' ) }
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
