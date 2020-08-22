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

export default function save( { attributes } ) {
	const { tag, uidClass, isRootContainer } = attributes;

	const HtmlTag = tag;
	return (
		<HtmlTag
			className={ classnames( {
				[ BLOCK_CLASSES.container.main ]: true,
				[ uidClass ]: true,
				[ BLOCK_CLASSES.container.rootContainer ]: isRootContainer,
			} ) }
		>
			<div className={ BLOCK_CLASSES.container.content }>
				<InnerBlocks.Content />
			</div>
		</HtmlTag>
	);
}
