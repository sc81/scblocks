/**
 * WordPress dependencies
 */
import { InnerBlocks } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { BLOCK_CLASSES } from '../../block/constants';

export default function Save( { attributes } ) {
	const { uidClass, tag } = attributes;
	const HtmlTag = tag || 'div';
	return (
		<HtmlTag
			className={ `${ BLOCK_CLASSES.column.main } ${ uidClass } ${ BLOCK_CLASSES.column.col }` }
		>
			<div className={ BLOCK_CLASSES.column.content }>
				<InnerBlocks.Content />
			</div>
		</HtmlTag>
	);
}
