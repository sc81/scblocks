/**
 * WordPress dependencies
 */
import { RichText } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import DangerouslyPasteIcon from '../../components/dangerously-paste-icon';
import { BLOCK_CLASSES } from '../../block/constants';

export default function save( { attributes } ) {
	const { text, level, icon, uidClass } = attributes;
	const TagName = level;

	return (
		<TagName className={ `${ BLOCK_CLASSES.heading.main } ${ uidClass }` }>
			<DangerouslyPasteIcon
				icon={ icon }
				className={ BLOCK_CLASSES.heading.icon }
			/>
			<RichText.Content
				className={ BLOCK_CLASSES.heading.text }
				tagName="span"
				value={ text }
			/>
		</TagName>
	);
}
