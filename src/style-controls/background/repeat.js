/**
 * WordPress dependencies
 */
import { SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import ControlWrapper from '../../components/control-wrapper';
import { names } from './constants';
import propertyService from '../property-service';

const options = [
	{ label: __( 'Default' ), value: '' },
	{ label: __( 'No repeat' ), value: 'no-repeat' },
	{ label: __( 'Repeat' ), value: 'repeat' },
	{ label: __( 'Repeat X' ), value: 'repeat-x' },
	{ label: __( 'Repeat Y' ), value: 'repeat-y' },
];

const propName = names.repeat;

export default function Repeat( props ) {
	const { propValue, onChange } = propertyService(
		{
			...props,
			propName,
		},
		true
	);

	return (
		<ControlWrapper label={ __( 'Repeat' ) } displayInline>
			<SelectControl
				value={ propValue }
				options={ options }
				onChange={ onChange }
			/>
		</ControlWrapper>
	);
}
