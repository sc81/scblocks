/**
 * WordPress dependencies
 */
import { InnerBlocks } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { BLOCK_CLASSES } from '../../block/constants';

export default function Save( { attributes } ) {
	return (
		<div
			className={ `${ BLOCK_CLASSES.buttons.main } ${ attributes.uidClass }` }
		>
			<InnerBlocks.Content />
		</div>
	);
}
