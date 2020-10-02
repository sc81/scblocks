/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { InnerBlocks } from '@wordpress/block-editor';
import { applyFilters } from '@wordpress/hooks';

/**
 * Internal dependencies
 */
import { BLOCK_CLASSES } from '../../block/constants';

export default function Save( { attributes } ) {
	const { uidClass, tag, elementId, cssClasses } = attributes;
	const HtmlTag = tag;
	const htmlAttributes = applyFilters(
		'scblocks.column.htmlAttributes',
		{
			id: !! elementId ? elementId : undefined,
			className: classnames( {
				[ BLOCK_CLASSES.column.main ]: true,
				[ uidClass ]: true,
				[ BLOCK_CLASSES.column.col ]: true,
				[ `${ cssClasses }` ]: '' !== cssClasses,
			} ),
		},
		attributes
	);
	return (
		<HtmlTag { ...htmlAttributes }>
			<div className={ BLOCK_CLASSES.column.inner }>
				{ applyFilters( 'scblocks.column.inside', null, attributes ) }
				<div className={ BLOCK_CLASSES.column.content }>
					<InnerBlocks.Content />
				</div>
			</div>
		</HtmlTag>
	);
}
