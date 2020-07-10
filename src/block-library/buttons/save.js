/**
 * WordPress dependencies
 */
import { InnerBlocks } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { BUTTONS_CLASS } from './utils';

export default function Save( { attributes } ) {
	return (
		<div className={ `${ BUTTONS_CLASS } ${ attributes.uidClass }` }>
			<InnerBlocks.Content />
		</div>
	);
}
