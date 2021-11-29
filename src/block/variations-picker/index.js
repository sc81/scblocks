/**
 * External dependencies
 */
import { get } from 'lodash';
/**
 * WordPress dependencies
 */
import { __experimentalBlockVariationPicker } from '@wordpress/block-editor';
import { useSelect, useDispatch } from '@wordpress/data';
import { createBlock } from '@wordpress/blocks';
import { useState } from '@wordpress/element';

/**
 * ScBlocks dependencies
 */
import {
	CORE_BLOCKS_STORE_NAME,
	CORE_BLOCK_EDITOR_STORE_NAME,
} from '@scblocks/constants';

function createBlocksFromInnerBlocksTemplate( innerBlocksTemplate ) {
	return innerBlocksTemplate.map(
		( [ name, attributes, innerBlocks = [] ] ) =>
			createBlock(
				name,
				attributes,
				createBlocksFromInnerBlocksTemplate( innerBlocks )
			)
	);
}

export default function VariationsPicker( props ) {
	const { clientId, name, blockProps, preVariations } = props;
	const { blockType, defaultVariation, variations } = useSelect(
		( select ) => {
			const {
				getBlockType,
				getBlockVariations,
				getDefaultBlockVariation,
			} = select( CORE_BLOCKS_STORE_NAME );
			return {
				blockType: getBlockType( name ),
				defaultVariation: getDefaultBlockVariation( name, 'block' ),
				variations: getBlockVariations( name, 'block' ),
			};
		},
		[ clientId, name ]
	);
	const [ showPreVariations, setShowPreVariations ] = useState(
		!! preVariations
	);
	const [ innerBlocksFor, setInnerBlocksFor ] = useState();

	const { replaceInnerBlocks } = useDispatch( CORE_BLOCK_EDITOR_STORE_NAME );
	return (
		<div { ...blockProps }>
			{ showPreVariations && (
				<__experimentalBlockVariationPicker
					icon={ get( blockType, [ 'icon', 'src' ] ) }
					label={ get( blockType, [ 'title' ] ) }
					variations={ preVariations }
					onSelect={ ( nextVariation ) => {
						if ( ! nextVariation ) {
							nextVariation = defaultVariation;
							if ( nextVariation.attributes ) {
								props.setAttributes( nextVariation.attributes );
							}
							if ( nextVariation.innerBlocks ) {
								replaceInnerBlocks(
									props.clientId,
									createBlocksFromInnerBlocksTemplate(
										nextVariation.innerBlocks
									)
								);
							}
						} else {
							setShowPreVariations( false );
							setInnerBlocksFor( nextVariation.type );
						}
					} }
					allowSkip
				/>
			) }
			{ ! showPreVariations && (
				<__experimentalBlockVariationPicker
					icon={ get( blockType, [ 'icon', 'src' ] ) }
					label={ get( blockType, [ 'title' ] ) }
					variations={ variations }
					onSelect={ ( nextVariation = defaultVariation ) => {
						if ( nextVariation.attributes ) {
							props.setAttributes( nextVariation.attributes );
						}
						if ( nextVariation.innerBlocks ) {
							replaceInnerBlocks(
								props.clientId,
								createBlocksFromInnerBlocksTemplate(
									nextVariation.innerBlocks
								)
							);
						} else if (
							innerBlocksFor &&
							nextVariation[ innerBlocksFor ]
						) {
							replaceInnerBlocks(
								props.clientId,
								createBlocksFromInnerBlocksTemplate(
									nextVariation[ innerBlocksFor ]
								)
							);
						}
					} }
					allowSkip
				/>
			) }
		</div>
	);
}
