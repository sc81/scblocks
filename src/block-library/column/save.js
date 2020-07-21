/**
 * WordPress dependencies
 */
import { InnerBlocks } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { COLUMN_CLASS, COLUMN_INNER_CLASS } from './utils';

export default function Save( { attributes } ) {
	const { uidClass, tag } = attributes;
	const HtmlTag = tag || 'div';
	return (
		<HtmlTag className={ `${ COLUMN_CLASS } ${ uidClass }` }>
			<div className={ COLUMN_INNER_CLASS }>
				<InnerBlocks.Content />
			</div>
		</HtmlTag>
	);
}
