/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { applyFilters } from '@wordpress/hooks';

/**
 * ScBlocks dependencies
 */
import { BLOCK_CLASSES } from '@scblocks/block';

export default function Save( { attributes } ) {
	const { uidClass, tag: Tag, htmlId, htmlClass } = attributes;
	const htmlAttributes = useBlockProps.save(
		applyFilters(
			'scblocks.column.htmlAttributes',
			{
				id: !! htmlId ? htmlId : undefined,
				className: classnames( {
					[ BLOCK_CLASSES.column.main ]: true,
					[ uidClass ]: true,
					[ `${ htmlClass }` ]: '' !== htmlClass,
				} ),
			},
			attributes
		)
	);
	return (
		<Tag { ...htmlAttributes }>
			<div className={ BLOCK_CLASSES.column.inner }>
				{ applyFilters( 'scblocks.column.inside', null, attributes ) }
				<div className={ BLOCK_CLASSES.column.content }>
					<InnerBlocks.Content />
				</div>
			</div>
		</Tag>
	);
}
