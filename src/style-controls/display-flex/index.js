/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { SelectControl } from '@wordpress/components';
/**
 * ScBlocks dependencies
 */
import { getPropValue, setPropValue } from '@scblocks/css-utils';
import { ALL_DEVICES } from '@scblocks/constants';

const propName = 'display';

export default function DisplayFlex( props ) {
	const propValue = getPropValue( {
		...props,
		devices: ALL_DEVICES,
		propName,
	} );

	return (
		<SelectControl
			label={ __( 'Display', 'scblocks' ) }
			value={ propValue }
			onChange={ ( value ) => {
				setPropValue( {
					...props,
					propName,
					devices: ALL_DEVICES,
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
	);
}
