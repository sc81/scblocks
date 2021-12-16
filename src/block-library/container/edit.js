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
	BlockAlignmentToolbar,
	BlockControls,
} from '@wordpress/block-editor';
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
	BLOCK_SELECTOR,
	VariationsPicker,
	GoogleFontsLink,
	getUidClass,
	AlignmentToolbar,
} from '@scblocks/block';
import {
	CORE_EDIT_POST_STORE_NAME,
	CORE_BLOCK_EDITOR_STORE_NAME,
	STORE_NAME,
} from '@scblocks/constants';

/**
 * Internal dependencies
 */
import { CONTAINER_SELECTORS_SETTINGS } from './utils';
import Inspector from './inspector';
import ShapeDividers from './shape-dividers';

const WIDE_ALIGNMENTS = [ 'wide', 'full' ];

export default function Edit( props ) {
	const { attributes, setAttributes, clientId, name } = props;
	const { htmlClass, htmlId, isDynamic, align } = attributes;
	const { devices, innerBlockCount, svgShapes } = useSelect(
		( select ) => {
			const { getBlockCount } = select( CORE_BLOCK_EDITOR_STORE_NAME );
			return {
				innerBlockCount: getBlockCount( clientId ),
				devices: select( CORE_EDIT_POST_STORE_NAME )
					.__experimentalGetPreviewDeviceType()
					.toLowerCase(),
				svgShapes: attributes.shapeDividers
					? select( STORE_NAME ).getSvgShapes()
					: undefined,
			};
		},
		[ clientId, attributes.shapeDividers ]
	);

	useEffect( () => {
		if ( typeof isDynamic === 'undefined' || ! isDynamic ) {
			setAttributes( { isDynamic: true } );
		}
	}, [ isDynamic, setAttributes ] );

	const selectorsSettings = applyFilters(
		'scblocks.container.selectorsSettings',
		CONTAINER_SELECTORS_SETTINGS,
		BLOCK_SELECTOR
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
					[ `align-${ align }` ]: !! align,
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
			<AlignmentToolbar
				{ ...props }
				devices={ devices }
				selector="main"
			/>
			<BlockControls>
				<BlockAlignmentToolbar
					value={ align }
					onChange={ ( value ) => {
						setAttributes( {
							align: value,
						} );
					} }
					controls={ WIDE_ALIGNMENTS }
				/>
			</BlockControls>
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
