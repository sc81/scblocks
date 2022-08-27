/**
 * WordPress dependencies
 */
import { SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
/**
 * ScBlocks dependencies
 */
import { ControlWrapper } from '@scblocks/components';

export default function FontWeight( { value, onChange } ) {
	return (
		<ControlWrapper
			label={ __( 'Font weight', 'scblocks' ) }
			isIndicator={ !! value }
			displayInline
			widerHeader={ 6 }
		>
			<SelectControl
				value={ value }
				options={ [
					{ label: __( 'Default', 'scblocks' ), value: '' },
					{ label: __( 'Thin (100)', 'scblocks' ), value: '100' },
					{
						label: __( 'Extra Light (200)', 'scblocks' ),
						value: '200',
					},
					{ label: __( 'Light (300)', 'scblocks' ), value: '300' },
					{ label: __( 'Normal (400)', 'scblocks' ), value: '400' },
					{ label: __( 'Medium (500)', 'scblocks' ), value: '500' },
					{
						label: __( 'Semi Bold (600)', 'scblocks' ),
						value: '600',
					},
					{ label: __( 'Bold (700)', 'scblocks' ), value: '700' },
					{
						label: __( 'Extra Bold (800)', 'scblocks' ),
						value: '800',
					},
					{ label: __( 'Black (900)', 'scblocks' ), value: '900' },
				] }
				onChange={ onChange }
			/>
		</ControlWrapper>
	);
}
