/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import {
	useBlockProps,
	useInnerBlocksProps,
	BlockControls,
} from '@wordpress/block-editor';
import { applyFilters } from '@wordpress/hooks';
import { useSelect, dispatch, select } from '@wordpress/data';
import { createBlock } from '@wordpress/blocks';
import { ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useEffect } from '@wordpress/element';

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
import { COLUMNS_SELECTORS_SETTINGS } from './utils';
import { COLUMN_NAME } from '../column/utils';
import Inspector from './inspector';

const ALLOWED_BLOCKS = [ COLUMN_NAME ];

export default function Edit( props ) {
	const { attributes, clientId, setAttributes, name } = props;
	const { htmlClass, htmlId, isDynamic } = attributes;

	const { devices, columnCount } = useSelect(
		( store ) => {
			return {
				devices: store( CORE_EDIT_POST_STORE_NAME )
					.__experimentalGetPreviewDeviceType()
					.toLowerCase(),
				columnCount: store(
					CORE_BLOCK_EDITOR_STORE_NAME
				).getBlockCount( clientId ),
			};
		},
		[ clientId ]
	);
	useEffect( () => {
		if ( typeof isDynamic === 'undefined' || ! isDynamic ) {
			setAttributes( { isDynamic: true } );
		}
	}, [] );

	const selectorsSettings = applyFilters(
		'scblocks.columns.selectorsSettings',
		COLUMNS_SELECTORS_SETTINGS,
		BLOCK_SELECTOR
	);
	const blockMemo = useBlockMemo( attributes, selectorsSettings );
	const style = useDynamicCss( props, devices );

	const blockProps = useBlockProps(
		applyFilters(
			'scblocks.columns.htmlAttributes',
			{
				id: !! htmlId ? htmlId : undefined,
				className: classnames( {
					[ BLOCK_CLASSES.columns.main ]: true,
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
						label={ __( 'Add Column', 'scblocks' ) }
						onClick={ () => {
							const innerBlocks = [
								...select(
									CORE_BLOCK_EDITOR_STORE_NAME
								).getBlocks( clientId ),
								createBlock( 'scblocks/column' ),
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
			{ columnCount > 0 && <div { ...innerBlocksProps } /> }
			{ columnCount === 0 && (
				<VariationsPicker { ...props } blockProps={ blockProps } />
			) }
		</>
	);
}
