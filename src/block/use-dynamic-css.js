/**
 * WordPress dependencies
 */
import { useEffect, useState } from '@wordpress/element';
import { select } from '@wordpress/data';

/**
 * ScBlocks dependencies
 */
import {
	CORE_BLOCK_EDITOR_STORE_NAME,
	CORE_EDIT_POST_STORE_NAME,
} from '@scblocks/constants';

/**
 * Internal dependencies
 */
import composeCss from './compose-css';

const storedUidClass = {};

const BLOCK_ALIAS = {
	button: 'btn',
	buttons: 'btns',
	column: 'col',
	columns: 'cols',
	container: 'con',
	heading: 'h',
};

function isBlockInsideReusableBlock( clientId ) {
	const { getBlockParents, getBlockName } = select(
		CORE_BLOCK_EDITOR_STORE_NAME
	);

	for ( const id of getBlockParents( clientId ) ) {
		if ( getBlockName( id ) === 'core/block' ) {
			return true;
		}
	}
	return false;
}

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
		let finalUidClass;
		const nextUidClass = `scb-${
			BLOCK_ALIAS[ blockName ]
		}-${ clientId.substr( 2, 9 ).replace( '-', '' ) }`;

		if ( ! isBlockInsideReusableBlock( clientId ) ) {
			if ( ! uidClass || storedUidClass[ uidClass ] !== undefined ) {
				finalUidClass = nextUidClass;
				setAttributes( { uidClass: nextUidClass } );
				storedUidClass[ nextUidClass ] = true;
			} else {
				storedUidClass[ uidClass ] = true;
				finalUidClass = uidClass;
			}
		} else if ( ! uidClass ) {
			setAttributes( { uidClass: nextUidClass } );
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

	// unmout
	useEffect(
		() => () => {
			// prevents the uidClass from being refreshed
			// when switching editor mode between visual and text
			const mode = select( CORE_EDIT_POST_STORE_NAME ).getEditorMode();
			if ( mode === 'text' && Object.keys( storedUidClass ).length > 0 ) {
				Object.keys( storedUidClass ).forEach(
					( id ) => delete storedUidClass[ id ]
				);
			}
		},
		[]
	);

	return style;
}
