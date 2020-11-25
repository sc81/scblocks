/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { applyFilters } from '@wordpress/hooks';

/**
 * Internal dependencies
 */
import { BLOCK_CLASSES } from '../../block/constants';

export default function save( { attributes } ) {
	const { uidClass, htmlId, htmlClass } = attributes;
	const htmlAttributes = useBlockProps.save(
		applyFilters(
			'scblocks.columns.htmlAttributes',
			{
				id: !! htmlId ? htmlId : undefined,
				className: classnames( {
					[ BLOCK_CLASSES.columns.main ]: true,
					[ uidClass ]: true,
					[ `${ htmlClass }` ]: '' !== htmlClass,
				} ),
			},
			attributes
		)
	);
	return (
		<div { ...htmlAttributes }>
			<InnerBlocks.Content />
		</div>
	);
}
