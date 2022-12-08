/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { RichText, useBlockProps } from '@wordpress/block-editor';
import { applyFilters } from '@wordpress/hooks';

/**
 * ScBlocks dependencies
 */
import { BLOCK_CLASSES, SELEKTORY, SHARED_ATTRIBUTES } from '@scblocks/block';
import { DangerouslyPasteIcon } from '@scblocks/components';

const deprecated = [
	// since 1.3.0
	{
		attributes: {
			...SHARED_ATTRIBUTES.required,
			tagName: {
				type: 'string',
				default: 'h2',
			},
			text: {
				type: 'string',
				source: 'html',
				selector: SELEKTORY.heading.text.selector,
				default: '',
			},
			icon: {
				type: 'string',
				source: 'html',
				selector: SELEKTORY.heading.icon.selector,
				default: '',
			},
			...SHARED_ATTRIBUTES.googleFonts,
			...SHARED_ATTRIBUTES.id,
			...SHARED_ATTRIBUTES.classes,
		},
		supports: {
			anchor: false,
			html: false,
			className: false,
			customClassName: false,
		},
		save( { attributes } ) {
			const {
				text,
				tagName: Tag,
				uidClass,
				icon,
				htmlId,
				htmlClass,
			} = attributes;

			const htmlAttributes = useBlockProps.save(
				applyFilters(
					'scblocks.heading.htmlAttributes',
					{
						id: !! htmlId ? htmlId : undefined,
						className: classnames( {
							[ BLOCK_CLASSES.heading.main ]: true,
							[ uidClass ]: true,
							[ BLOCK_CLASSES.heading.text ]: ! icon,
							[ `${ htmlClass }` ]: '' !== htmlClass,
						} ),
					},
					attributes
				)
			);
			return (
				<Tag { ...htmlAttributes }>
					<DangerouslyPasteIcon
						icon={ icon }
						className={ BLOCK_CLASSES.heading.icon }
					/>
					<RichText.Content
						value={ text }
						tagName={ !! icon ? 'span' : null }
						className={
							!! icon ? BLOCK_CLASSES.heading.text : null
						}
					/>
				</Tag>
			);
		},
	},
];
export default deprecated;
