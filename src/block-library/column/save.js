/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { InnerBlocks } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { BLOCK_CLASSES } from '../../block/constants';

export default function Save( {
	attributes: { uidClass, tag, elementId, cssClasses },
} ) {
	const HtmlTag = tag || 'div';
	return (
		<HtmlTag
			id={ !! elementId ? elementId : undefined }
			className={ classnames( {
				[ BLOCK_CLASSES.column.main ]: true,
				[ uidClass ]: true,
				[ BLOCK_CLASSES.column.col ]: true,
				[ `${ cssClasses }` ]: '' !== cssClasses,
			} ) }
		>
			<div className={ BLOCK_CLASSES.column.inner }>
				<div className={ BLOCK_CLASSES.column.content }>
					<InnerBlocks.Content />
				</div>
			</div>
		</HtmlTag>
	);
}
