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
	const { uidClass, htmlId, htmlClass } = attributes;
	const htmlAttributes = applyFilters(
		'scblocks.buttons.htmlAttributes',
		{
			id: !! htmlId ? htmlId : undefined,
			className: classnames( {
				[ BLOCK_CLASSES.buttons.main ]: true,
				[ uidClass ]: true,
				[ `${ htmlClass }` ]: '' !== htmlClass,
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
