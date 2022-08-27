/**
 * WordPress dependencies
 */
import { TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * ScBlocks dependencies
 */
import { ControlWrapper, propertyService } from '@scblocks/components';

const propName = 'zIndex';

export default function Zindex( props ) {
	const { propValue, onChange } = propertyService( {
		...props,
		propName,
	} );

	return (
		<ControlWrapper
			label={ props.label || __( 'Z-index', 'scblocks' ) }
			isIndicator={ !! propValue }
			isClearButton={ !! propValue }
			onClear={ () => onChange( '' ) }
		>
			<TextControl
				value={ propValue }
				onChange={ onChange }
				type="number"
				autocomplete="off"
			/>
		</ControlWrapper>
	);
}
