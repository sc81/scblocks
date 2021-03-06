/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { RichText, useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { applyFilters } from '@wordpress/hooks';

/**
 * ScBlocks dependencies
 */
import { BLOCK_CLASSES } from '@scblocks/block';
import { DangerouslyPasteIcon } from '@scblocks/components';

const placeholder = __( 'Button', 'scblocks' );

export default function Save( { attributes } ) {
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
		relAttributes.length > 0 ? relAttributes.join( ' ' ) : undefined;

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
					className={ !! icon ? BLOCK_CLASSES.button.text : null }
					value={ text || placeholder }
				/>
			) }
		</Tag>
	);
}
