/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import {
	InnerBlocks,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { applyFilters } from '@wordpress/hooks';

/**
 * ScBlocks dependencies
 */
import { BLOCK_CLASSES, Inspector, useRequiredProps } from '@scblocks/block';
import { CORE_BLOCK_EDITOR_STORE_NAME } from '@scblocks/constants';

/**
 * Internal dependencies
 */
import getSelectorsSettings from './selectors-settings';

export default function Edit( props ) {
	const { attributes, clientId } = props;
	const { htmlId, htmlClass } = attributes;
	const hasChildBlocks = useSelect(
		( store ) =>
			store( CORE_BLOCK_EDITOR_STORE_NAME ).getBlockCount( clientId ),
		[ clientId ]
	);

	const requiredProps = useRequiredProps( props, getSelectorsSettings );
	const { style, itemClass, uidClass } = requiredProps;

	const blockProps = useBlockProps(
		applyFilters(
			'scblocks.column.htmlAttributes',
			{
				id: !! htmlId ? htmlId : undefined,
				className: classnames( {
					[ BLOCK_CLASSES.column.main ]: true,
					[ uidClass ]: true,
					[ itemClass ]: !! itemClass,
					[ htmlClass ]: !! htmlClass,
				} ),
			},
			attributes
		)
	);
	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		templateLock: false,
		renderAppender: hasChildBlocks
			? undefined
			: InnerBlocks.ButtonBlockAppender,
	} );

	return (
		<>
			<style>{ style }</style>
			<Inspector { ...props } { ...requiredProps } />
			<div { ...innerBlocksProps } />
		</>
	);
}
