/**
 * WordPress dependencies
 */
import { InnerBlocks } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { COLUMNS_CLASS } from './utils';

export default function save( { attributes } ) {
	return (
		<div className={ `${ COLUMNS_CLASS } ${ attributes.uidClass }` }>
			<InnerBlocks.Content />
		</div>
	);
}
