/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import {
	useBlockProps,
	__experimentalUseInnerBlocksProps as useInnerBlocksProps,
	BlockControls,
} from '@wordpress/block-editor';
import { applyFilters } from '@wordpress/hooks';
import { useSelect, dispatch, select } from '@wordpress/data';
import { createBlock } from '@wordpress/blocks';
import { ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * ScBlocks dependencies
 */
import {
	useDynamicCss,
	useBlockMemo,
	BLOCK_CLASSES,
	BLOCK_SELECTOR,
	VariationsPicker,
	getUidClass,
} from '@scblocks/block';
import {
	CORE_EDIT_POST_STORE_NAME,
	CORE_BLOCK_EDITOR_STORE_NAME,
} from '@scblocks/constants';

/**
 * Internal dependencies
 */
import Inspector from './inspector';
import { GRID_SELECTORS_SETTINGS } from './utils';

const ALLOWED_BLOCKS = [ 'scblocks/container' ];

export default function Edit( props ) {
	const { attributes, clientId, name } = props;
	const { htmlClass, htmlId } = attributes;

	const { devices, itemCount } = useSelect(
		( store ) => {
			return {
				devices: store( CORE_EDIT_POST_STORE_NAME )
					.__experimentalGetPreviewDeviceType()
					.toLowerCase(),
				itemCount: store( CORE_BLOCK_EDITOR_STORE_NAME ).getBlockCount(
					clientId
				),
			};
		},
		[ clientId ]
	);

	const selectorsSettings = applyFilters(
		'scblocks.grid.selectorsSettings',
		GRID_SELECTORS_SETTINGS,
		BLOCK_SELECTOR
	);
	const blockMemo = useBlockMemo( attributes, selectorsSettings );
	const style = useDynamicCss( props, devices );

	const blockProps = useBlockProps(
		applyFilters(
			'scblocks.grid.htmlAttributes',
			{
				id: !! htmlId ? htmlId : undefined,
				className: classnames( {
					[ BLOCK_CLASSES.grid.main ]: true,
					[ getUidClass( name, clientId ) ]: true,
					[ `${ htmlClass }` ]: '' !== htmlClass,
				} ),
			},
			attributes
		)
	);
	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		allowedBlocks: ALLOWED_BLOCKS,
		renderAppender: false,
	} );

	return (
		<>
			<style>{ style }</style>
			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton
						icon="plus"
						label={ __( 'Add Item', 'scblocks' ) }
						onClick={ () => {
							const innerBlocks = [
								...select(
									CORE_BLOCK_EDITOR_STORE_NAME
								).getBlocks( clientId ),
								createBlock(
									'scblocks/container',
									{ isGridItem: true },
									[
										createBlock( 'core/paragraph', {
											placeholder:
												'Paragraph in the container',
										} ),
									]
								),
							];
							dispatch(
								CORE_BLOCK_EDITOR_STORE_NAME
							).replaceInnerBlocks(
								clientId,
								innerBlocks,
								false
							);
						} }
					/>
				</ToolbarGroup>
			</BlockControls>
			<Inspector
				{ ...props }
				blockMemo={ blockMemo }
				devices={ devices }
				selectorsSettings={ selectorsSettings }
			/>
			{ itemCount > 0 && <div { ...innerBlocksProps } /> }
			{ itemCount === 0 && (
				<VariationsPicker { ...props } blockProps={ blockProps } />
			) }
		</>
	);
}
