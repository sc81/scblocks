/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { RichText, useBlockProps } from '@wordpress/block-editor';
import { applyFilters } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';

/**
 * ScBlocks dependencies
 */
import { BLOCK_CLASSES, SELEKTORY, SHARED_ATTRIBUTES } from '@scblocks/block';
import { DangerouslyPasteIcon } from '@scblocks/components';

const placeholder = __( 'Button', 'scblocks' );

const deprecated = [
	// since 1.3.0
	{
		attributes: {
			...SHARED_ATTRIBUTES.required,
			...SHARED_ATTRIBUTES.id,
			...SHARED_ATTRIBUTES.classes,
			url: {
				type: 'string',
				source: 'attribute',
				selector: 'a',
				attribute: 'href',
			},
			text: {
				type: 'string',
				source: 'html',
				selector: SELEKTORY.button.text.selector,
			},
			target: {
				type: 'boolean',
				default: false,
			},
			relNoFollow: {
				type: 'boolean',
				default: false,
			},
			relSponsored: {
				type: 'boolean',
				default: false,
			},
			icon: {
				type: 'string',
				source: 'html',
				selector: SELEKTORY.button.icon.selector,
				default: '',
			},
			withoutText: {
				type: 'boolean',
				default: false,
			},
			ariaLabel: {
				type: 'string',
				source: 'attribute',
				selector: 'a',
				attribute: 'aria-label',
			},
			...SHARED_ATTRIBUTES.googleFonts,
		},
		supports: {
			alignWide: false,
			className: false,
			html: false,
			reusable: false,
			customClassName: false,
		},
		save( { attributes } ) {
			const {
				url,
				target,
				relNoFollow,
				relSponsored,
				text,
				icon,
				uidClass,
				withoutText,
				htmlId,
				htmlClass,
				ariaLabel,
			} = attributes;
			const relAttributes = [];

			if ( relNoFollow ) {
				relAttributes.push( 'nofollow' );
			}

			if ( target ) {
				relAttributes.push( 'noopener', 'noreferrer' );
			}

			if ( relSponsored ) {
				relAttributes.push( 'sponsored' );
			}
			const rel =
				relAttributes.length > 0
					? relAttributes.join( ' ' )
					: undefined;

			const htmlAttributes = useBlockProps.save(
				applyFilters(
					'scblocks.button.htmlAttributes',
					{
						id: !! htmlId ? htmlId : undefined,
						className: classnames( {
							[ BLOCK_CLASSES.button.main ]: true,
							[ uidClass ]: true,
							[ BLOCK_CLASSES.button.text ]: ! icon,
							[ `${ htmlClass }` ]: '' !== htmlClass,
						} ),
						href: url,
						target: target ? '_blank' : undefined,
						rel,
						'aria-label': !! ariaLabel ? ariaLabel : undefined,
					},
					attributes
				)
			);
			const Tag = url ? 'a' : 'span';
			return (
				<Tag { ...htmlAttributes }>
					<DangerouslyPasteIcon
						icon={ icon }
						className={ BLOCK_CLASSES.button.icon }
					/>
					{ ! withoutText && (
						<RichText.Content
							tagName={ !! icon ? 'span' : null }
							className={
								!! icon ? BLOCK_CLASSES.button.text : null
							}
							value={ text || placeholder }
						/>
					) }
				</Tag>
			);
		},
	},
];
export default deprecated;
