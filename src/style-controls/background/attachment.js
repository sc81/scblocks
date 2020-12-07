/**
 * WordPress dependencies
 */
import { SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * ScBlocks dependencies
 */
import { ControlWrapper } from '@scblocks/components';

/**
 * Internal dependencies
 */
import propertyService from '../property-service';
import { names } from './constants';

const propName = names.attachment;

export default function Attachment( props ) {
	const { propValue, onChange } = propertyService(
		{
			...props,
			propName,
		},
		true
	);

	return (
		<ControlWrapper label={ __( 'Attachment', 'scblocks' ) } displayInline>
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
