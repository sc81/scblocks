/**
 * WordPress dependencies
 */
import { SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * ScBlocks dependencies
 */
import { ControlWrapper, propertyService } from '@scblocks/components';

/**
 * Internal dependencies
 */
import { names } from './constants';

const propName = names.attachment;

export default function Attachment( props ) {
	const { propValue, onChange } = propertyService( {
		...props,
		propName,
	} );

	return (
		<ControlWrapper
			label={ __( 'Attachment', 'scblocks' ) }
			displayInline
			isIndicator={ !! propValue }
		>
			<SelectControl
				value={ propValue }
				options={ [
					{ label: __( 'Default', 'scblocks' ), value: '' },
					{ label: __( 'Scroll', 'scblocks' ), value: 'scroll' },
					{ label: __( 'Fixed', 'scblocks' ), value: 'fixed' },
				] }
				onChange={ onChange }
			/>
		</ControlWrapper>
	);
}
