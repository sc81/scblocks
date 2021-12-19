/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { useEffect, useState } from '@wordpress/element';
import { applyFilters } from '@wordpress/hooks';

/**
 * ScBlocks dependencies
 */
import {
	useDynamicCss,
	useBlockMemo,
	BLOCK_CLASSES,
	VariationsPicker,
	GoogleFontsLink,
	getUidClass,
} from '@scblocks/block';
import {
	CORE_EDIT_POST_STORE_NAME,
	CORE_BLOCK_EDITOR_STORE_NAME,
	STORE_NAME,
} from '@scblocks/constants';

/**
 * Internal dependencies
 */
import getContainerSelectorsSettings from './utils';
import Inspector from './inspector';
import ShapeDividers from './shape-dividers';
import { preVariations } from './variations';
import ToolbarControls from './toolbar-controls';

export default function Edit( props ) {
	const { attributes, setAttributes, clientId, name } = props;
	const {
		htmlClass,
		htmlId,
		isDynamic,
		isGridItem,
		align,
		useThemeContentWidth,
	} = attributes;
	const {
		devices,
		innerBlockCount,
		svgShapes,
		isParentGridContainer,
		isRegisteredAlignWide,
	} = useSelect(
		( select ) => {
			const {
				getBlockCount,
				getBlockParents,
				getBlock,
				getSettings,
			} = select( CORE_BLOCK_EDITOR_STORE_NAME );
			const parentBlockId = getBlockParents( clientId, true )[ 0 ];
			const parentBlock = parentBlockId
				? getBlock( parentBlockId )
				: null;
			return {
				innerBlockCount: getBlockCount( clientId ),
				devices: select( CORE_EDIT_POST_STORE_NAME )
					.__experimentalGetPreviewDeviceType()
					.toLowerCase(),
				svgShapes: attributes.shapeDividers
					? select( STORE_NAME ).getSvgShapes()
					: undefined,
				isParentGridContainer:
					parentBlock && 'scblocks/grid' === parentBlock.name
						? true
						: '',
				isRegisteredAlignWide: getSettings().alignWide,
			};
		},
		[ clientId, attributes.shapeDividers ]
	);

	const [ selectorsSettings, setSelectorsSettings ] = useState(
		getContainerSelectorsSettings()
	);

	useEffect( () => {
		setAttributes( { isGridItem: isParentGridContainer } );

		if ( ! isParentGridContainer ) {
			setSelectorsSettings( getContainerSelectorsSettings() );
		} else {
			const settings = getContainerSelectorsSettings();
			settings[ 0 ].allowedPanels.grid = {
				gridColumn: true,
				gridRow: true,
				gridArea: true,
				justifySelf: true,
				alignSelf: true,
				order: true,
			};
			setSelectorsSettings( settings );
		}
	}, [ isParentGridContainer, setAttributes ] );

	useEffect( () => {
		if ( typeof isDynamic === 'undefined' || ! isDynamic ) {
			setAttributes( { isDynamic: true } );
		}
	}, [ isDynamic, setAttributes ] );

	const style = useDynamicCss( props, devices );

	const blockMemo = useBlockMemo( attributes, selectorsSettings );

	const blockProps = useBlockProps(
		applyFilters(
			'scblocks.container.htmlAttributes',
			{
				id: !! htmlId ? htmlId : undefined,
				className: classnames( {
					[ BLOCK_CLASSES.container.main ]: true,
					[ getUidClass( name, clientId ) ]: true,
					[ `align-${ align }` ]: ! isRegisteredAlignWide && !! align,
					[ BLOCK_CLASSES.container
						.contentWidth ]: useThemeContentWidth,
					[ `${ htmlClass }` ]: '' !== htmlClass,
					[ BLOCK_CLASSES.container.gridItem ]: isGridItem,
				} ),
				'data-align': align ? align : undefined,
			},
			attributes
		)
	);
	const innerBlocksProps = useInnerBlocksProps(
		{
			className: BLOCK_CLASSES.container.content,
		},
		{
			templateLock: false,
		}
	);

	return (
		<>
			<style>{ style }</style>
			<ToolbarControls { ...props } devices={ devices } />
			<GoogleFontsLink attributes={ attributes } />
			<Inspector
				{ ...props }
				devices={ devices }
				blockMemo={ blockMemo }
				selectorsSettings={ selectorsSettings }
				svgShapes={ svgShapes }
			/>
			<div { ...blockProps }>
				{ applyFilters( 'scblocks.container.afterOpen', null, props ) }
				<ShapeDividers { ...props } svgShapes={ svgShapes } />
				{ innerBlockCount > 0 && <div { ...innerBlocksProps } /> }
				{ innerBlockCount === 0 && (
					<VariationsPicker
						{ ...props }
						blockProps={ innerBlocksProps }
						preVariations={ preVariations }
					/>
				) }
				{ applyFilters(
					'scblocks.container.beforeClose',
					null,
					props
				) }
			</div>
		</>
	);
}
