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

export default function Save( { attributes } ) {
	const {
		url,
		linkTarget,
		rel,
		text,
		icon,
		uidClass,
		withoutText,
	} = attributes;

	return (
		<a
			className={ `${ BLOCK_CLASSES.button.main } ${ uidClass }` }
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
