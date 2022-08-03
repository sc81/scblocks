/**
 * WordPress dependencies
 */
import { SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * ScBlocks dependencies
 */
import { ControlWrapper } from '@scblocks/components';

export default function TextAlign( { value, onChange } ) {
	return (
		<ControlWrapper
			label={ __( 'Text Align', 'scblocks' ) }
			isIndicator={ !! value }
		>
			<SelectControl
				value={ value }
				options={ [
					{ label: __( 'Default', 'scblocks' ), value: '' },
					{ label: __( 'Left', 'scblocks' ), value: 'left' },
					{ label: __( 'Center', 'scblocks' ), value: 'center' },
					{ label: __( 'Right', 'scblocks' ), value: 'right' },
				] }
				onChange={ onChange }
			/>
		</ControlWrapper>
	);
}
