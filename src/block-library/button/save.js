/**
 * WordPress dependencies
 */
import { RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import {
	BUTTON_CLASS,
	BUTTON_LINK_CLASS,
	BUTTON_ICON_CLASS,
	BUTTON_TEXT_CLASS,
} from './utils';

const placeholder = __( 'Add text !!!' );

export default function Save( { attributes } ) {
	const { url, linkTarget, rel, text, icon, uidClass } = attributes;

	return (
		<div className={ `${ BUTTON_CLASS } ${ uidClass }` }>
			<a
				className={ BUTTON_LINK_CLASS }
				href={ url }
				target={ linkTarget }
				rel={ rel }
			>
				{ !! icon && (
					<span
						className={ BUTTON_ICON_CLASS }
						dangerouslySetInnerHTML={ { __html: icon } }
					/>
				) }
				<RichText.Content
					tagName="span"
					className={ BUTTON_TEXT_CLASS }
					value={ text || placeholder }
				/>
			</a>
		</div>
	);
}
