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
import ShapeDividers from './shape-dividers';

export default function save( { attributes } ) {
	const {
		tag: Tag,
		uidClass,
		isRootContainer,
		htmlId,
		htmlClass,
	} = attributes;
	const htmlAttributes = useBlockProps.save(
		applyFilters(
			'scblocks.container.htmlAttributes',
			{
				id: !! htmlId ? htmlId : undefined,
				className: classnames( {
					[ BLOCK_CLASSES.container.main ]: true,
					[ uidClass ]: true,
					[ BLOCK_CLASSES.container.rootContainer ]: isRootContainer,
					[ `${ htmlClass }` ]: '' !== htmlClass,
				} ),
			},
			attributes
		)
	);
	return (
		<Tag { ...htmlAttributes }>
			{ applyFilters( 'scblocks.container.inside', null, attributes ) }
			<ShapeDividers attributes={ attributes } />
			<div className={ BLOCK_CLASSES.container.content }>
				<InnerBlocks.Content />
			</div>
		</Tag>
	);
}
