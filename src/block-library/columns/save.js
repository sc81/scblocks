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

export default function save( { attributes } ) {
	const { uidClass, elementId, cssClasses } = attributes;
	const htmlAttributes = applyFilters(
		'scblocks.columns.htmlAttributes',
		{
			id: !! elementId ? elementId : undefined,
			className: classnames( {
				[ BLOCK_CLASSES.columns.main ]: true,
				[ uidClass ]: true,
				[ `${ cssClasses }` ]: '' !== cssClasses,
			} ),
		},
		attributes
	);
	return (
		<div { ...htmlAttributes }>
			<InnerBlocks.Content />
		</div>
	);
}
