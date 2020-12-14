/**
 * WordPress dependencies
 */
import { SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * ScBlocks dependencies
 */
import { ControlWrapper, propertyService } from '@scblocks/components';

const propName = 'justifyContent';

export default function JustifyContent( props ) {
	const { label, displayInline } = props;
	const { propValue, onChange } = propertyService( {
		...props,
		propName,
	} );

	return (
		<ControlWrapper
			label={ label || __( 'Justify-content', 'scblocks' ) }
			displayInline={ displayInline }
		>
			<SelectControl
				value={ propValue }
				options={ [
					{ label: __( 'Default', 'scblocks' ), value: '' },
					{ label: __( 'Start', 'scblocks' ), value: 'flex-start' },
					{ label: __( 'Center', 'scblocks' ), value: 'center' },
					{ label: __( 'End', 'scblocks' ), value: 'flex-end' },
				] }
				onChange={ onChange }
			/>
		</ControlWrapper>
	);
}
