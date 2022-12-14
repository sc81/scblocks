/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { applyFilters } from '@wordpress/hooks';

/**
 * ScBlocks dependencies
 */
import {
	BLOCK_CLASSES,
	VariationsPicker,
	GoogleFontsLink,
	Inspector,
	useRequiredProps,
} from '@scblocks/block';
import { CORE_BLOCK_EDITOR_STORE_NAME, STORE_NAME } from '@scblocks/constants';

/**
 * Internal dependencies
 */
import getSelectorsSettings from './selectors-settings';
import './inspector-controls';
import ShapeDividers from './shape-dividers';
import ToolbarControls from './toolbar-controls';

export default function Edit( props ) {
	const { attributes, clientId } = props;
	const { htmlClass, htmlId, align, useThemeContentWidth } = attributes;
	const { innerBlockCount, svgShapes, isRegisteredAlignWide } = useSelect(
		( select ) => {
			const { getBlockCount, getSettings } = select(
				CORE_BLOCK_EDITOR_STORE_NAME
			);
			return {
				innerBlockCount: getBlockCount( clientId ),
				svgShapes: attributes.shapeDividers
					? select( STORE_NAME ).getSvgShapes()
					: undefined,
				isRegisteredAlignWide: getSettings().alignWide,
			};
		},
		[ clientId, attributes.shapeDividers ]
	);

	const requiredProps = useRequiredProps( props, getSelectorsSettings );
	const { style, devices, itemClass, uidClass } = requiredProps;

	const blockProps = useBlockProps(
		applyFilters(
			'scblocks.container.htmlAttributes',
			{
				id: !! htmlId ? htmlId : undefined,
				className: classnames( {
					[ BLOCK_CLASSES.container.main ]: true,
					[ uidClass ]: true,
					[ itemClass ]: !! itemClass,
					[ htmlClass ]: !! htmlClass,
					[ `align-${ align }` ]: ! isRegisteredAlignWide && !! align,
					[ BLOCK_CLASSES.container.contentWidth ]:
						useThemeContentWidth,
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
				{ ...requiredProps }
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
