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
import { BLOCK_CLASSES, SHARED_ATTRIBUTES } from '@scblocks/block';

const deprecated = [
	// since 1.2.0
	{
		attributes: {
			...SHARED_ATTRIBUTES.required,
			...SHARED_ATTRIBUTES.id,
			...SHARED_ATTRIBUTES.classes,
			...SHARED_ATTRIBUTES.bgImageIds,
			tag: {
				type: 'string',
				default: 'div',
			},
			...SHARED_ATTRIBUTES.googleFonts,
		},
		supports: {
			inserter: false,
			reusable: false,
			html: false,
			className: false,
			customClassName: false,
		},
		save( { attributes } ) {
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
						{ applyFilters(
							'scblocks.column.inside',
							null,
							attributes
						) }
						<div className={ BLOCK_CLASSES.column.content }>
							<InnerBlocks.Content />
						</div>
					</div>
				</Tag>
			);
		},
	},
];
export default deprecated;
