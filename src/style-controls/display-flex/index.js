/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { SelectControl } from '@wordpress/components';
/**
 * ScBlocks dependencies
 */
import { getPropValue, setPropValue } from '@scblocks/css-utils';
import { ControlWrapper } from '@scblocks/components';

const propName = 'display';

export default function DisplayFlex( props ) {
	const propValue = getPropValue( {
		...props,
		propName,
	} );

	return (
		<ControlWrapper
			label={ __( 'Display', 'scblocks' ) }
			isIndicator={ !! propValue }
			isSelectDevice={ false }
			displayInline
			widerHeader={ 6 }
		>
			<SelectControl
				value={ propValue }
				onChange={ ( value ) => {
					setPropValue( {
						...props,
						propName,
						value,
					} );
				} }
				options={ [
					{ label: __( 'Default', 'scblocks' ), value: '' },
					{ label: __( 'Flex', 'scblocks' ), value: 'flex' },
					{
						label: __( 'Inline-Flex', 'scblocks' ),
						value: 'inline-flex',
					},
				] }
			/>
		</ControlWrapper>
	);
}
