/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { ToggleControl } from '@wordpress/components';
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
		<ToggleControl
			label={ __( 'Use Flex', 'scblocks' ) }
			checked={ propValue === 'flex' }
			onChange={ ( value ) => {
				setPropValue( {
					...props,
					propName,
					devices: ALL_DEVICES,
					value: value ? 'flex' : '',
				} );
			} }
		/>
	);
}
