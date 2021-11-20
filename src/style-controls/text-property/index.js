/**
 * WordPress dependencies
 */
import { TextControl } from '@wordpress/components';
/**
 * ScBlocks dependencies
 */
import { ControlWrapper, propertyService } from '@scblocks/components';

export default function TextProperty( props ) {
	const { propValue, onChange } = propertyService( props );
	return (
		<ControlWrapper
			label={ props.label }
			displayClearButton={ !! propValue }
			onClear={ () => onChange( '' ) }
		>
			<TextControl
				value={ propValue }
				onChange={ onChange }
				autocomplete="off"
			/>
		</ControlWrapper>
	);
}
