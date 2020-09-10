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
		linkTarget,
		rel,
		text,
		icon,
		uidClass,
		withoutText,
		elementId,
		cssClasses,
	},
} ) {
	return (
		<a
			id={ !! elementId ? elementId : undefined }
			className={ classnames( {
				[ BLOCK_CLASSES.button.main ]: true,
				[ uidClass ]: true,
				[ `${ cssClasses }` ]: '' !== cssClasses,
			} ) }
			href={ url }
			target={ linkTarget }
			rel={ rel }
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
