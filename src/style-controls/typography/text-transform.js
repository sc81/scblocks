/**
 * WordPress dependencies
 */
import { SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export default function TextTransform( { value, onChange } ) {
	return (
		<SelectControl
			label={ __( 'Text Transform', 'scblocks' ) }
			value={ value }
			options={ [
				{ label: __( 'Default', 'scblocks' ), value: '' },
				{ label: __( 'Uppercase', 'scblocks' ), value: 'uppercase' },
				{ label: __( 'Lowercase', 'scblocks' ), value: 'lowercase' },
				{ label: __( 'Capitalize', 'scblocks' ), value: 'capitalize' },
				{ label: __( 'Normal', 'scblocks' ), value: 'normal' },
			] }
			onChange={ onChange }
		/>
	);
}
