/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import {
	InnerBlocks,
	__experimentalBlock as Block,
	BlockControls,
} from '@wordpress/block-editor';
import { applyFilters } from '@wordpress/hooks';
import { useSelect, dispatch, select } from '@wordpress/data';
import { createBlock } from '@wordpress/blocks';
import { Toolbar, Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import {
	CORE_BLOCK_EDITOR_STORE_NAME,
	CORE_EDIT_POST_STORE_NAME,
	DESKTOP_DEVICES,
} from '../../constants';
import { COLUMNS_SELECTORS_SETTINGS } from './utils';
import useDynamicCss from '../../hooks/use-dynamic-css';
import { useBlockMemo } from '../../hooks/use-block-memo';
import VariationsPicker from '../../block/variations-picker';
import { COLUMN_NAME } from '../column/utils';
import Inspector from './inspector';
import { BLOCK_CLASSES, BLOCK_SELECTOR } from '../../block/constants';

const ALLOWED_BLOCKS = [ COLUMN_NAME ];

export default function Edit( props ) {
	const { attributes, clientId } = props;
	const { uidClass, htmlClass, htmlId } = attributes;

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
	const selectorsSettings = applyFilters(
		'scblocks.columns.selectorsSettings',
		COLUMNS_SELECTORS_SETTINGS,
		BLOCK_SELECTOR
	);
	const blockMemo = useBlockMemo( attributes, selectorsSettings );
	useDynamicCss( props, devices );

	const htmlAttributes = applyFilters(
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
	);

	return (
		<>
			<BlockControls>
				<Toolbar>
					<Button
						icon="plus"
						showTooltip
						label={ __( 'Add Column', 'scblocks' ) }
						onClick={ () => {
							const innerBlocks = [
								...select(
									CORE_BLOCK_EDITOR_STORE_NAME
								).getBlocks( clientId ),
								createBlock( 'scblocks/column', {
									css: {
										[ DESKTOP_DEVICES ]: {
											[ BLOCK_SELECTOR.column.main
												.alias ]: [ 'width:50%' ],
										},
									},
								} ),
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
				</Toolbar>
			</BlockControls>
			<Inspector
				{ ...props }
				blockMemo={ blockMemo }
				devices={ devices }
				selectorsSettings={ selectorsSettings }
			/>
			{ columnCount > 0 && (
				<InnerBlocks
					allowedBlocks={ ALLOWED_BLOCKS }
					__experimentalMoverDirection="horizontal"
					__experimentalTagName={ Block.div }
					__experimentalPassedProps={ htmlAttributes }
					renderAppender={ false }
				/>
			) }
			{ columnCount === 0 && <VariationsPicker { ...props } /> }
		</>
	);
}
