/**
 * WordPress dependencies
 */
import { RichText } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import DangerouslyPasteIcon from '../../components/dangerously-paste-icon';
import { HEADING_CLASS, HEADING_ICON_CLASS, HEADING_TEXT_CLASS } from './utils';

export default function save( { attributes } ) {
	const { text, level, icon, uidClass } = attributes;
	const TagName = level;

	return (
		<TagName className={ `${ HEADING_CLASS } ${ uidClass }` }>
			<DangerouslyPasteIcon
				icon={ icon }
				className={ HEADING_ICON_CLASS }
			/>
			<RichText.Content
				className={ HEADING_TEXT_CLASS }
				tagName="span"
				value={ text }
			/>
		</TagName>
	);
}
