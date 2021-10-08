/**
 * WordPress dependencies
 */
import { useEffect, useState } from '@wordpress/element';
import { select } from '@wordpress/data';

/**
 * ScBlocks dependencies
 */
import { CORE_BLOCK_EDITOR_STORE_NAME } from '@scblocks/constants';

/**
 * Internal dependencies
 */
import composeCss from './compose-css';

export default function useDynamicCss( props, device ) {
	const {
		clientId,
		attributes: { uidClass, css },
		setAttributes,
		name,
	} = props;
	const [ style, setStyle ] = useState( '' );

	// block name without namespace
	const blockName = name.split( '/' )[ 1 ];

	// mount
	useEffect( () => {
		let finalUidClass = uidClass;
		const nextUidClass = `scb-${ blockName }-${ clientId
			.substr( 2, 9 )
			.replace( '-', '' ) }`;

		if ( ! uidClass ) {
			setAttributes( { uidClass: nextUidClass } );
			finalUidClass = nextUidClass;
		} else {
			const { getBlockParents, getBlocks } = select(
				CORE_BLOCK_EDITOR_STORE_NAME
			);
			const parents = getBlockParents( clientId );
			let parentBlocks;
			if ( ! parents.length ) {
				parentBlocks = getBlocks();
			} else {
				parentBlocks = getBlocks( parents[ parents.length - 1 ] );
			}
			const isDuplication = parentBlocks.some( ( block ) => {
				return (
					block.clientId !== clientId &&
					block.name === name &&
					block.attributes.uidClass &&
					block.attributes.uidClass === uidClass
				);
			} );

			if ( isDuplication ) {
				setAttributes( { uidClass: nextUidClass } );
				finalUidClass = nextUidClass;
			}
		}

		setStyle(
			composeCss( {
				css,
				blockName,
				uidClass: finalUidClass,
				device,
			} )
		);
	}, [] );

	// update
	useEffect( () => {
		if ( uidClass ) {
			setStyle(
				composeCss( {
					css,
					blockName,
					uidClass,
					device,
				} )
			);
		}
	}, [ setStyle, composeCss, css, blockName, uidClass, device ] );

	return style;
}
