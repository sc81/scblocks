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

const options = [
	{ label: __( 'Default', 'scblocks' ), value: '' },
	{ label: __( 'No repeat', 'scblocks' ), value: 'no-repeat' },
	{ label: __( 'Repeat', 'scblocks' ), value: 'repeat' },
	{ label: __( 'Repeat X', 'scblocks' ), value: 'repeat-x' },
	{ label: __( 'Repeat Y', 'scblocks' ), value: 'repeat-y' },
];

const propName = names.repeat;

export default function Repeat( props ) {
	const { propValue, onChange } = propertyService( {
		...props,
		propName,
	} );

	return (
		<ControlWrapper label={ __( 'Repeat', 'scblocks' ) } displayInline>
			<SelectControl
				value={ propValue }
				options={ options }
				onChange={ onChange }
			/>
		</ControlWrapper>
	);
}
