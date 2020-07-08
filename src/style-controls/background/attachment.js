/**
 * WordPress dependencies
 */
import { SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import ControlWrapper from '../../components/control-wrapper';
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
		<ControlWrapper label={ __( 'Attachment' ) } displayInline>
			<SelectControl
				value={ propValue }
				options={ [
					{ label: __( 'Default' ), value: '' },
					{ label: __( 'Scroll' ), value: 'scroll' },
					{ label: __( 'Fixed' ), value: 'fixed' },
				] }
				onChange={ onChange }
			/>
		</ControlWrapper>
	);
}
