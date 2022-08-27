/**
 * WordPress dependencies
 */
import { SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
/**
 * ScBlocks dependencies
 */
import { ControlWrapper } from '@scblocks/components';

export default function TextDecoration( { value, onChange } ) {
	return (
		<ControlWrapper
			label={ __( 'Text Decoration', 'scblocks' ) }
			isIndicator={ !! value }
			displayInline
			widerHeader={ 6 }
		>
			<SelectControl
				value={ value }
				options={ [
					{ label: __( 'Default', 'scblocks' ), value: '' },
					{
						label: __( 'Underline', 'scblocks' ),
						value: 'underline',
					},
					{ label: __( 'Overline', 'scblocks' ), value: 'overline' },
					{
						label: __( 'Line-through', 'scblocks' ),
						value: 'line-through',
					},
					{ label: __( 'None', 'scblocks' ), value: 'none' },
				] }
				onChange={ onChange }
			/>
		</ControlWrapper>
	);
}
