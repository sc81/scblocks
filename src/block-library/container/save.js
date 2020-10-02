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
	const {
		tag,
		uidClass,
		isRootContainer,
		elementId,
		cssClasses,
	} = attributes;
	const HtmlTag = tag;
	const htmlAttributes = applyFilters(
		'scblocks.container.htmlAttributes',
		{
			id: !! elementId ? elementId : undefined,
			className: classnames( {
				[ BLOCK_CLASSES.container.main ]: true,
				[ uidClass ]: true,
				[ BLOCK_CLASSES.container.rootContainer ]: isRootContainer,
				[ `${ cssClasses }` ]: '' !== cssClasses,
			} ),
		},
		attributes
	);
	return (
		<HtmlTag { ...htmlAttributes }>
			{ applyFilters( 'scblocks.container.inside', null, attributes ) }
			<div className={ BLOCK_CLASSES.container.content }>
				<InnerBlocks.Content />
			</div>
		</HtmlTag>
	);
}
