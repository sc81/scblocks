/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { TextControl } from '@wordpress/components';

/**
 * ScBlocks dependencies
 */
import { ControlWrapper } from '@scblocks/components';

export default function FontFamily( { value, onChange, onClear } ) {
	return (
		<ControlWrapper
			label={ __( 'Font Family', 'scblocks' ) }
			withoutSelectDevices
			displayClearButton={ !! value }
			onClear={ onClear }
		>
			<TextControl
				value={ value }
				onChange={ onChange }
				autocomplete="off"
			/>
		</ControlWrapper>
	);
}
