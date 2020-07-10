/**
 * WordPress dependencies
 */
import { RichText } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import {
	BUTTON_CLASS,
	BUTTON_LINK_CLASS,
	BUTTON_ICON_CLASS,
	BUTTON_TEXT_CLASS,
	getIconPositionClass,
} from './utils';

export default function Save( { attributes } ) {
	const {
		url,
		linkTarget,
		rel,
		text,
		icon,
		uidClass,
		iconPosition,
	} = attributes;

	return (
		<div className={ `${ BUTTON_CLASS } ${ uidClass }` }>
			<a
				className={ `${ BUTTON_LINK_CLASS } ${ getIconPositionClass(
					iconPosition
				) }` }
				href={ url }
				target={ linkTarget }
				rel={ rel }
			>
				<RichText.Content
					tagName="span"
					className={ BUTTON_TEXT_CLASS }
					value={ text }
				/>
				{ !! icon && (
					<span
						className={ BUTTON_ICON_CLASS }
						dangerouslySetInnerHTML={ { __html: icon } }
					/>
				) }
			</a>
		</div>
	);
}
