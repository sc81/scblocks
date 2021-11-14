/**
 * WordPress dependencies
 */
import { SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * ScBlocks dependencies
 */
import { ControlWrapper, propertyService } from '@scblocks/components';

const options = {
	items: [
		{ label: __( 'Default', 'scblocks' ), value: '' },
		{ label: __( 'Start', 'scblocks' ), value: 'start' },
		{ label: __( 'Flex-Start', 'scblocks' ), value: 'flex-start' },
		{ label: __( 'Center', 'scblocks' ), value: 'center' },
		{ label: __( 'End', 'scblocks' ), value: 'end' },
		{ label: __( 'Flex-End', 'scblocks' ), value: 'flex-end' },
		{ label: __( 'Stretch', 'scblocks' ), value: 'stretch' },
		{ label: __( 'Normal', 'scblocks' ), value: 'normal' },
		{ label: __( 'Baseline', 'scblocks' ), value: 'baseline' },
	],
	self: [
		{ label: __( 'Default', 'scblocks' ), value: '' },
		{ label: __( 'Start', 'scblocks' ), value: 'start' },
		{ label: __( 'Flex-Start', 'scblocks' ), value: 'flex-start' },
		{ label: __( 'Center', 'scblocks' ), value: 'center' },
		{ label: __( 'End', 'scblocks' ), value: 'end' },
		{ label: __( 'Flex-End', 'scblocks' ), value: 'flex-end' },
		{ label: __( 'Auto', 'scblocks' ), value: 'auto' },
		{ label: __( 'Normal', 'scblocks' ), value: 'normal' },
		{ label: __( 'Stretch', 'scblocks' ), value: 'stretch' },
		{ label: __( 'Baseline', 'scblocks' ), value: 'baseline' },
		{ label: __( 'First Baseline', 'scblocks' ), value: 'first baseline' },
		{ label: __( 'Last Baseline', 'scblocks' ), value: 'last baseline' },
	],
	content: [
		{ label: __( 'Default', 'scblocks' ), value: '' },
		{ label: __( 'Start', 'scblocks' ), value: 'start' },
		{ label: __( 'Flex-Start', 'scblocks' ), value: 'flex-start' },
		{ label: __( 'Center', 'scblocks' ), value: 'center' },
		{ label: __( 'End', 'scblocks' ), value: 'end' },
		{ label: __( 'Flex-End', 'scblocks' ), value: 'flex-end' },
		{ label: __( 'Space-Between', 'scblocks' ), value: 'space-between' },
		{ label: __( 'Space-Around', 'scblocks' ), value: 'space-around' },
		{ label: __( 'Space-Evenly', 'scblocks' ), value: 'space-evenly' },
		{ label: __( 'Stretch', 'scblocks' ), value: 'stretch' },
		{ label: __( 'Normal', 'scblocks' ), value: 'normal' },
		{ label: __( 'Baseline', 'scblocks' ), value: 'baseline' },
	],
};

export default function Align( props ) {
	const { propValue, onChange } = propertyService( props );

	return (
		<ControlWrapper label={ props.label }>
			<SelectControl
				value={ propValue }
				options={ options[ props.propSuffix ] }
				onChange={ onChange }
			/>
		</ControlWrapper>
	);
}
