/**
 * WordPress dependencies
 */
import { useEffect, useState } from '@wordpress/element';
import { select } from '@wordpress/data';

/**
 * ScBlocks dependencies
 */
import { CORE_EDIT_POST_STORE_NAME } from '@scblocks/constants';

/**
 * Internal dependencies
 */
import composeCss from './compose-css';

const memorizedUids = [];

const BLOCK_ALIAS = {
	button: 'btn',
	buttons: 'btns',
	column: 'col',
	columns: 'cols',
	container: 'con',
	heading: 'h',
};

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
		const nextUidClass = `scb-${
			BLOCK_ALIAS[ blockName ]
		}-${ clientId.substr( 2, 9 ).replace( '-', '' ) }`;

		let finalUidClass;

		if ( ! uidClass || memorizedUids.includes( uidClass ) ) {
			setAttributes( { uidClass: nextUidClass } );
			memorizedUids.push( nextUidClass );
			finalUidClass = nextUidClass;
		} else {
			memorizedUids.push( uidClass );
			finalUidClass = uidClass;
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
			if ( mode === 'text' && memorizedUids.length ) {
				memorizedUids.length = 0;
			}
		},
		[]
	);

	return style;
}
