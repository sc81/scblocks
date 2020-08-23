/**
 * WordPress dependencies
 */
import { RichText } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { BLOCK_CLASSES } from '../../block/constants';

export default function save( { attributes: { text, tagName, uidClass } } ) {
	return (
		<RichText.Content
			className={ `${ BLOCK_CLASSES.heading.main } ${ uidClass }` }
			tagName={ tagName }
			value={ text }
		/>
	);
}
