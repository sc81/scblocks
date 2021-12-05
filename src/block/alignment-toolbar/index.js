/**
 * WordPress dependencies
 */
import { AlignmentControl, BlockControls } from '@wordpress/block-editor';
/**
 * ScBlocks dependencies
 */
import { getPropValue, setPropValue } from '@scblocks/css-utils';

const propName = 'textAlign';

export default function AlignmentToolbar( {
	setAttributes,
	attributes,
	devices,
	selector,
} ) {
	const textAlign = getPropValue( {
		attributes,
		devices,
		selector,
		propName,
	} );
	return (
		<BlockControls group="block">
			<AlignmentControl
				value={ textAlign }
				onChange={ ( value ) => {
					setPropValue( {
						selector,
						devices,
						attributes,
						setAttributes,
						propName,
						value,
					} );
				} }
			/>
		</BlockControls>
	);
}
