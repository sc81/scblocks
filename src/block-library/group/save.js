/**
 * WordPress dependencies
 */
import { InnerBlocks } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { GROUP_CLASS, GROUP_INNER_CLASS } from './utils';
import BackgroundVideo from './background-video';
import BackgroundOverlay from '../../block/background-overlay';
import ShapeDividers from '../../block/shape-dividers';

export default function save( { attributes } ) {
	const { tag, uidClass } = attributes;

	const HtmlTag = tag;
	return (
		<HtmlTag className={ `${ GROUP_CLASS } ${ uidClass }` }>
			<BackgroundVideo attributes={ attributes } />
			<BackgroundOverlay attributes={ attributes } />
			<ShapeDividers attributes={ attributes } />
			<div className={ GROUP_INNER_CLASS }>
				<InnerBlocks.Content />
			</div>
		</HtmlTag>
	);
}
