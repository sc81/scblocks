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

export default function save( {
	attributes: { uidClass, elementId, cssClasses },
} ) {
	return (
		<div
			id={ !! elementId ? elementId : undefined }
			className={ classnames( {
				[ BLOCK_CLASSES.columns.main ]: true,
				[ uidClass ]: true,
				[ `${ cssClasses }` ]: '' !== cssClasses,
			} ) }
		>
			<InnerBlocks.Content />
		</div>
	);
}
