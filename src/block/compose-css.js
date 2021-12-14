/**
 * ScBlocks dependencies
 */
import {
	ALL_DEVICES,
	TABLET_DEVICE,
	MOBILE_DEVICE,
	DESKTOP_DEVICE,
} from '@scblocks/constants';
/**
 * Internal dependencies
 */
import { BLOCK_SELECTOR } from './block-selector';

function standardizeName( name ) {
	return name.replace( /[A-Z]/g, ( e ) => '-' + e.toLowerCase() );
}
function composePropValue( selectorProps ) {
	let css = '',
		colonIndex,
		name,
		value;

	selectorProps.forEach( ( prop ) => {
		colonIndex = prop.indexOf( ':' );
		name = prop.slice( 0, colonIndex );
		value = prop.slice( colonIndex );

		css += standardizeName( name ) + value + ';';
	} );
	return css;
}

function isShapeAlias( selectorAlias ) {
	return selectorAlias.startsWith( 'shape-' );
}

function shapeFinalSelector( selectorAlias, blockName, uidClass ) {
	let shapeClass = 'scb-' + selectorAlias;
	let tempAlias = 'shape';
	if ( selectorAlias.startsWith( 'shape-svg' ) ) {
		shapeClass = `scb-shape${ selectorAlias.replace(
			'shape-svg',
			''
		) } svg`;
		tempAlias = 'shapeSvg';
	}
	return BLOCK_SELECTOR[ blockName ][ tempAlias ].fullSelector(
		uidClass,
		shapeClass
	);
}

function composeSelectors( selectors, blockName, uidClass ) {
	let css = '',
		finalSelector;
	for ( const selectorAlias in selectors ) {
		if ( isShapeAlias( selectorAlias ) ) {
			finalSelector = shapeFinalSelector(
				selectorAlias,
				blockName,
				uidClass
			);
		} else {
			finalSelector = BLOCK_SELECTOR[ blockName ][
				selectorAlias
			].fullSelector( uidClass );
		}
		css += `.editor-styles-wrapper ${ finalSelector }{${ composePropValue(
			selectors[ selectorAlias ]
		) }}`;
	}
	return css;
}
export default function composeCss( {
	css: cssState,
	blockName,
	uidClass,
	device: currentDevice,
} ) {
	const css = {
		[ ALL_DEVICES ]: '',
		[ DESKTOP_DEVICE ]: '',
		[ TABLET_DEVICE ]: '',
		[ MOBILE_DEVICE ]: '',
	};

	for ( const cssDevice in cssState ) {
		css[ cssDevice ] += composeSelectors(
			cssState[ cssDevice ],
			blockName,
			uidClass
		);
	}

	if ( currentDevice === DESKTOP_DEVICE ) {
		return css[ ALL_DEVICES ] + css[ DESKTOP_DEVICE ];
	} else if ( currentDevice === TABLET_DEVICE ) {
		return (
			css[ ALL_DEVICES ] + css[ DESKTOP_DEVICE ] + css[ TABLET_DEVICE ]
		);
	}
	return (
		css[ ALL_DEVICES ] +
		css[ DESKTOP_DEVICE ] +
		css[ TABLET_DEVICE ] +
		css[ MOBILE_DEVICE ]
	);
}
