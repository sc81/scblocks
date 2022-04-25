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
		},
		supports: {
			inserter: false,
			html: false,
			className: false,
			customClassName: false,
		},
		save( { attributes } ) {
			const { uidClass, htmlId, htmlClass } = attributes;
			const htmlAttributes = useBlockProps.save(
				applyFilters(
					'scblocks.columns.htmlAttributes',
					{
						id: !! htmlId ? htmlId : undefined,
						className: classnames( {
							[ BLOCK_CLASSES.columns.main ]: true,
							[ uidClass ]: true,
							[ `${ htmlClass }` ]: '' !== htmlClass,
						} ),
					},
					attributes
				)
			);
			return (
				<div { ...htmlAttributes }>
					<InnerBlocks.Content />
				</div>
			);
		},
	},
];
export default deprecated;
