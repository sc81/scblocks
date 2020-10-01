/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { BLOCK_CLASSES } from '../../block/constants';

const placeholder = __( 'Button', 'scblocks' );

export default function Save( {
	attributes: {
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
	},
} ) {
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
	return (
		<a
			id={ !! elementId ? elementId : undefined }
			className={ classnames( {
				[ BLOCK_CLASSES.button.main ]: true,
				[ uidClass ]: true,
				[ `${ cssClasses }` ]: '' !== cssClasses,
			} ) }
			href={ url }
			target={ target ? '_blank' : undefined }
			rel={ rel }
			aria-label={ !! ariaLabel ? ariaLabel : undefined }
		>
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
