/**
 * WordPress dependencies
 */
import { RichText } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { BLOCK_CLASSES } from '../../block/constants';
import DangerouslyPasteIcon from '../../components/dangerously-paste-icon';

export default function save( {
	attributes: { text, tagName, uidClass, icon, isWrapped },
} ) {
	if ( ! isWrapped ) {
		return (
			<RichText.Content
				className={ `${ BLOCK_CLASSES.heading.text } ${ uidClass }` }
				tagName={ tagName }
				value={ text }
			/>
		);
	}

	return (
		<div className={ `${ BLOCK_CLASSES.heading.wrapper } ${ uidClass }` }>
			<DangerouslyPasteIcon
				icon={ icon }
				className={ BLOCK_CLASSES.heading.icon }
			/>
			<RichText.Content
				className={ BLOCK_CLASSES.heading.text }
				tagName={ tagName }
				value={ text }
			/>
		</div>
	);
}
