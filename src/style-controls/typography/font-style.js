/**
 * WordPress dependencies
 */
import { SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
/**
 * ScBlocks dependencies
 */
import { ControlWrapper } from '@scblocks/components';

export default function FontStyle( { value, onChange } ) {
	return (
		<ControlWrapper
			label={ __( 'Font Style', 'scblocks' ) }
			isIndicator={ !! value }
			displayInline
			widerHeader={ 6 }
		>
			<SelectControl
				value={ value }
				options={ [
					{ label: __( 'Default', 'scblocks' ), value: '' },
					{ label: __( 'Normal', 'scblocks' ), value: 'normal' },
					{ label: __( 'Italic', 'scblocks' ), value: 'italic' },
					{ label: __( 'Oblique', 'scblocks' ), value: 'oblique' },
				] }
				onChange={ onChange }
			/>
		</ControlWrapper>
	);
}
