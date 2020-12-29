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
} from '@scblocks/block';
import {
	CORE_EDIT_POST_STORE_NAME,
	CORE_BLOCK_EDITOR_STORE_NAME,
} from '@scblocks/constants';

/**
 * Internal dependencies
 */
import { CONTAINER_SELECTORS_SETTINGS } from './utils';
import Inspector from './inspector';
import ShapeDividers from './shape-dividers';

export default function Edit( props ) {
	const { attributes, setAttributes, clientId } = props;
	const { uidClass, htmlClass, htmlId, isDynamic } = attributes;
	const { devices, innerBlockCount, isRootContainer } = useSelect(
		( select ) => {
			const { getBlockCount, getBlockHierarchyRootClientId } = select(
				CORE_BLOCK_EDITOR_STORE_NAME
			);
			return {
				innerBlockCount: getBlockCount( clientId ),
				devices: select( CORE_EDIT_POST_STORE_NAME )
					.__experimentalGetPreviewDeviceType()
					.toLowerCase(),
				isRootContainer:
					getBlockHierarchyRootClientId( clientId ) === clientId,
			};
		},
		[ clientId ]
	);

	useEffect( () => {
		setAttributes( { isRootContainer } );
	}, [ isRootContainer, setAttributes ] );

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
					[ uidClass ]: true,
					[ BLOCK_CLASSES.container.rootContainer ]: isRootContainer,
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
			/>
			<div { ...blockProps }>
				{ applyFilters(
					'scblocks.container.afterOpen',
					null,
					attributes
				) }
				<ShapeDividers { ...props } />
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
