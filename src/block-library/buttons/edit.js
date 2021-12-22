/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { useSelect } from '@wordpress/data';
import {
	useBlockProps,
	useInnerBlocksProps,
	InspectorControls,
} from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import { applyFilters } from '@wordpress/hooks';
import { useEffect } from '@wordpress/element';

/**
 * ScBlocks dependencies
 */
import {
	useDynamicCss,
	useBlockMemo,
	BLOCK_CLASSES,
	VariationsPicker,
	IdClassesControls,
	ControlsManager,
	getUidClass,
	useSelectorsSettings,
} from '@scblocks/block';
import {
	CORE_EDIT_POST_STORE_NAME,
	CORE_BLOCK_EDITOR_STORE_NAME,
} from '@scblocks/constants';

/**
 * Internal dependencies
 */
import getSelectorsSettings from './utils';
import { BUTTON_BLOCK_NAME } from '../button/utils';

const ALLOWED_BLOCKS = [ BUTTON_BLOCK_NAME ];

const SELECTORS_INITIAL_SETTINGS = getSelectorsSettings();

export default function Edit( props ) {
	const { attributes, setAttributes, clientId, name } = props;
	const { htmlClass, htmlId, isDynamic } = attributes;
	const { devices, buttonCount } = useSelect(
		( select ) => {
			return {
				devices: select( CORE_EDIT_POST_STORE_NAME )
					.__experimentalGetPreviewDeviceType()
					.toLowerCase(),
				buttonCount: select(
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

	const selectorsSettings = useSelectorsSettings(
		SELECTORS_INITIAL_SETTINGS,
		'buttons',
		props
	);
	const blockMemo = useBlockMemo( attributes, selectorsSettings );
	const style = useDynamicCss( props, devices );

	const blockProps = useBlockProps(
		applyFilters(
			'scblocks.buttons.htmlAttributes',
			{
				id: !! htmlId ? htmlId : undefined,
				className: classnames( {
					[ BLOCK_CLASSES.buttons.main ]: true,
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
			<InspectorControls>
				<ControlsManager
					selectorsSettings={ selectorsSettings }
					setAttributes={ setAttributes }
					attributes={ attributes }
					devices={ devices }
					blockMemo={ blockMemo }
					mainControls={ applyFilters(
						'scblocks.buttons.mainControls',
						null,
						{ ...props, devices, blockMemo }
					) }
					htmlAttrsControls={ applyFilters(
						'scblocks.buttons.htmlAttrControls',
						<PanelBody opened>
							<IdClassesControls { ...props } />
						</PanelBody>,
						{ ...props, devices, blockMemo }
					) }
				/>
			</InspectorControls>
			{ buttonCount > 0 && <div { ...innerBlocksProps } /> }
			{ buttonCount === 0 && (
				<VariationsPicker { ...props } blockProps={ blockProps } />
			) }
		</>
	);
}
