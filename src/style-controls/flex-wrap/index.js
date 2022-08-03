/**
 * WordPress dependencies
 */
import { SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * ScBlocks dependencies
 */
import { ControlWrapper, propertyService } from '@scblocks/components';

export default function FlexWrap( props ) {
	const { propValue, onChange } = propertyService( {
		...props,
		propName: 'flexWrap',
	} );

	return (
		<ControlWrapper
			label={ __( 'Flex-Wrap', 'scblocks' ) }
			isIndicator={ !! propValue }
		>
			<SelectControl
				value={ propValue }
				onChange={ onChange }
				options={ [
					{ label: __( 'Default', 'scblocks' ), value: '' },
					{ label: __( 'Wrap', 'scblocks' ), value: 'wrap' },
					{
						label: __( 'Wrap-Reverse', 'scblocks' ),
						value: 'wrap-reverse',
					},
				] }
			/>
		</ControlWrapper>
	);
}
