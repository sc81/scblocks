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

export default function Edit( props ) {
	const { attributes, setAttributes, clientId, name } = props;
	const { htmlClass, htmlId, isDynamic, isGridItem } = attributes;
	const {
		devices,
		innerBlockCount,
		isRootContainer,
		svgShapes,
		isParentGridContainer,
	} = useSelect(
		( select ) => {
			const {
				getBlockCount,
				getBlockHierarchyRootClientId,
				getBlockParents,
				getBlock,
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
				isRootContainer:
					getBlockHierarchyRootClientId( clientId ) === clientId,
				svgShapes: attributes.shapeDividers
					? select( STORE_NAME ).getSvgShapes()
					: undefined,
				isParentGridContainer:
					parentBlock && 'scblocks/grid' === parentBlock.name
						? true
						: '',
			};
		},
		[ clientId, attributes.shapeDividers ]
	);

	useEffect( () => {
		setAttributes( { isRootContainer } );
	}, [ isRootContainer, setAttributes ] );

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
					[ BLOCK_CLASSES.container.rootContainer ]: isRootContainer,
					[ BLOCK_CLASSES.container.gridItem ]: isGridItem,
					[ `${ htmlClass }` ]: '' !== htmlClass,
				} ),
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
			<GoogleFontsLink attributes={ attributes } />
			<Inspector
				{ ...props }
				devices={ devices }
				blockMemo={ blockMemo }
				selectorsSettings={ selectorsSettings }
				svgShapes={ svgShapes }
			/>
			<div { ...blockProps }>
				{ applyFilters(
					'scblocks.container.afterOpen',
					null,
					attributes
				) }
				<ShapeDividers { ...props } svgShapes={ svgShapes } />
				{ innerBlockCount > 0 && <div { ...innerBlocksProps } /> }
				{ innerBlockCount === 0 && (
					<VariationsPicker
						{ ...props }
						blockProps={ innerBlocksProps }
					/>
				) }
				{ applyFilters(
					'scblocks.container.beforeClose',
					null,
					attributes
				) }
			</div>
		</>
	);
}
