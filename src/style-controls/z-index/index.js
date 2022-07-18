/**
 * WordPress dependencies
 */
import { TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * ScBlocks dependencies
 */
import { ALL_DEVICES } from '@scblocks/constants';
import { propertyService } from '@scblocks/components';

const propName = 'zIndex';

export default function Zindex( props ) {
	const { propValue, onChange } = propertyService( {
		...props,
		propName,
		devices: ALL_DEVICES,
	} );

	return (
		<TextControl
			label={ props.label || __( 'Z-index', 'scblocks' ) }
			value={ propValue }
			onChange={ onChange }
			type="number"
			autocomplete="off"
		/>
	);
}
