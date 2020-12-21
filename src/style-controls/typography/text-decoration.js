/**
 * WordPress dependencies
 */
import { SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export default function TextDecoration( { value, onChange } ) {
	return (
		<SelectControl
			label={ __( 'Decoration', 'scblocks' ) }
			value={ value }
			options={ [
				{ label: __( 'Default', 'scblocks' ), value: '' },
				{ label: __( 'Underline', 'scblocks' ), value: 'underline' },
				{ label: __( 'Overline', 'scblocks' ), value: 'overline' },
				{
					label: __( 'Line-through', 'scblocks' ),
					value: 'line-through',
				},
				{ label: __( 'None', 'scblocks' ), value: 'none' },
			] }
			onChange={ onChange }
		/>
	);
}
