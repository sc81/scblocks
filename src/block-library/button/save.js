/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { applyFilters } from '@wordpress/hooks';

/**
 * Internal dependencies
 */
import { BLOCK_CLASSES } from '../../block/constants';

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
		elementId,
		cssClasses,
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

	const htmlAttributes = applyFilters(
		'scblocks.button.htmlAttributes',
		{
			id: !! elementId ? elementId : undefined,
			className: classnames( {
				[ BLOCK_CLASSES.button.main ]: true,
				[ uidClass ]: true,
				[ `${ cssClasses }` ]: '' !== cssClasses,
			} ),
			href: url,
			target: target ? '_blank' : undefined,
			rel,
			'aria-label': !! ariaLabel ? ariaLabel : undefined,
		},
		attributes
	);
	return (
		<a { ...htmlAttributes }>
			{ !! icon && (
				<span
					className={ BLOCK_CLASSES.button.icon }
					dangerouslySetInnerHTML={ { __html: icon } }
				/>
			) }
			{ ! withoutText && (
				<RichText.Content
					tagName="span"
					className={ BLOCK_CLASSES.button.text }
					value={ text || placeholder }
				/>
			) }
		</a>
	);
}
