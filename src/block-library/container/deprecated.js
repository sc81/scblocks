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
			isRootContainer: {
				type: 'boolean',
				default: false,
			},
			...SHARED_ATTRIBUTES.googleFonts,
		},
		supports: {
			className: false,
			html: false,
			customClassName: false,
		},
		save( { attributes } ) {
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
							[ BLOCK_CLASSES.container
								.rootContainer ]: isRootContainer,
							[ `${ htmlClass }` ]: '' !== htmlClass,
						} ),
					},
					attributes
				)
			);
			return (
				<Tag { ...htmlAttributes }>
					{ applyFilters(
						'scblocks.container.inside',
						null,
						attributes
					) }
					<div className={ BLOCK_CLASSES.container.content }>
						<InnerBlocks.Content />
					</div>
				</Tag>
			);
		},
	},
];
export default deprecated;
