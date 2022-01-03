/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
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
	useSelectorsSettings,
} from '@scblocks/block';
import {
	CORE_EDIT_POST_STORE_NAME,
	CORE_BLOCK_EDITOR_STORE_NAME,
	STORE_NAME,
} from '@scblocks/constants';

/**
 * Internal dependencies
 */
import getSelectorsSettings from './utils';
import Inspector from './inspector';
import ShapeDividers from './shape-dividers';
import ToolbarControls from './toolbar-controls';

const SELECTORS_INITIAL_SETTINGS = getSelectorsSettings();

export default function Edit( props ) {
	const { attributes, setAttributes, clientId, name } = props;
	const {
		htmlClass,
		htmlId,
		isDynamic,
		align,
		useThemeContentWidth,
	} = attributes;
	const {
		devices,
		innerBlockCount,
		svgShapes,
		isRegisteredAlignWide,
	} = useSelect(
		( select ) => {
			const { getBlockCount, getSettings } = select(
				CORE_BLOCK_EDITOR_STORE_NAME
			);
			return {
				innerBlockCount: getBlockCount( clientId ),
				devices: select( CORE_EDIT_POST_STORE_NAME )
					.__experimentalGetPreviewDeviceType()
					.toLowerCase(),
				svgShapes: attributes.shapeDividers
					? select( STORE_NAME ).getSvgShapes()
					: undefined,
				isRegisteredAlignWide: getSettings().alignWide,
			};
		},
		[ clientId, attributes.shapeDividers ]
	);

	useEffect( () => {
		if ( typeof isDynamic === 'undefined' || ! isDynamic ) {
			setAttributes( { isDynamic: true } );
		}
	}, [ isDynamic, setAttributes ] );

	const selectorsSettings = useSelectorsSettings(
		SELECTORS_INITIAL_SETTINGS,
		'container',
		props
	);

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
					[ `${ htmlClass }` ]: '' !== htmlClass,
					[ `align-${ align }` ]: ! isRegisteredAlignWide && !! align,
					[ BLOCK_CLASSES.container
						.contentWidth ]: useThemeContentWidth,
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
			<GoogleFontsLink clientId={ clientId } />
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
