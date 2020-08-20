/**
 * WordPress dependencies
 */
import { InnerBlocks } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import BackgroundVideo from './background-video';
import BackgroundOverlay from '../../block/background-overlay';
import { BLOCK_CLASSES } from '../../block/constants';

export default function save( { attributes } ) {
	const { tag, uidClass } = attributes;

	const HtmlTag = tag;
	return (
		<HtmlTag className={ `${ BLOCK_CLASSES.group.main } ${ uidClass }` }>
			<BackgroundVideo attributes={ attributes } />
			<BackgroundOverlay attributes={ attributes } />
			<div className={ BLOCK_CLASSES.group.content }>
				<InnerBlocks.Content />
			</div>
		</HtmlTag>
	);
}
