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
import { useEffect } from '@wordpress/element';

/**
 * ScBlocks dependencies
 */
import {
	useDynamicCss,
	useBlockMemo,
	BLOCK_CLASSES,
	getUidClass,
	useSelectorsSettings,
	useItemClass,
} from '@scblocks/block';
import {
	CORE_EDIT_POST_STORE_NAME,
	CORE_BLOCK_EDITOR_STORE_NAME,
} from '@scblocks/constants';

/**
 * Internal dependencies
 */
import getSelectorsSettings from './selectors-settings';
import Inspector from './inspector';

export default function Edit( props ) {
	const { attributes, clientId, setAttributes, name } = props;
	const { htmlId, htmlClass, isDynamic } = attributes;
	const { devices, hasChildBlocks } = useSelect(
		( store ) => {
			return {
				devices: store( CORE_EDIT_POST_STORE_NAME )
					.__experimentalGetPreviewDeviceType()
					.toLowerCase(),
				hasChildBlocks: store(
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

	const [ selectorsSettings, setSelectorsSettings ] = useSelectorsSettings(
		getSelectorsSettings,
		'column',
		props
	);
	const blockMemo = useBlockMemo( attributes, selectorsSettings );
	const style = useDynamicCss( props, devices );

	const itemClass = useItemClass( clientId );

	const blockProps = useBlockProps(
		applyFilters(
			'scblocks.column.htmlAttributes',
			{
				id: !! htmlId ? htmlId : undefined,
				className: classnames( {
					[ BLOCK_CLASSES.column.main ]: true,
					[ getUidClass( name, clientId ) ]: true,
					[ itemClass ]: '' !== itemClass,
					[ `${ htmlClass }` ]: '' !== htmlClass,
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
			<Inspector
				{ ...props }
				blockMemo={ blockMemo }
				devices={ devices }
				selectorsSettings={ selectorsSettings }
				setSelectorsSettings={ setSelectorsSettings }
			/>
			<div { ...innerBlocksProps } />
		</>
	);
}
