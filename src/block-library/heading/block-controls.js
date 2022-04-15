/**
 * WordPress dependencies
 */
import { addFilter } from '@wordpress/hooks';

/**
 * ScBlocks dependencies
 */
import { AlignmentToolbar } from '@scblocks/block';

function blockControls( controls, props, devices ) {
	return (
		<>
			<AlignmentToolbar
				{ ...props }
				devices={ devices }
				selector="main"
			/>
			{ controls }
		</>
	);
}

addFilter(
	'scblocks.heading.blockControls',
	'scblocks/heading/blockControls',
	blockControls,
	10
);
