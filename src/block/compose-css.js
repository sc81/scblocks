/**
 * WordPress dependencies
 */
import { applyFilters } from '@wordpress/hooks';
/**
 * ScBlocks dependencies
 */
import { ALL_DEVICES } from '@scblocks/constants';
/**
 * Internal dependencies
 */
import { BLOCK_SELECTOR } from './block-selector';

/* global scblocksMediaQuery */

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

function getBlockFullSelector( blockName, alias, uidClass ) {
	if ( BLOCK_SELECTOR[ blockName ] ) {
		return BLOCK_SELECTOR[ blockName ][ alias ].fullSelector( uidClass );
	}
	return applyFilters(
		'scblocks.composeCss.blockSelector',
		'undefined',
		blockName,
		alias,
		uidClass
	);
}

function shapeFinalSelector( selectorAlias, uidClass ) {
	let shapeClass = 'scb-' + selectorAlias;
	let tempAlias = 'shape';
	if ( selectorAlias.startsWith( 'shape-svg' ) ) {
		shapeClass = `scb-shape${ selectorAlias.replace(
			'shape-svg',
			''
		) } svg`;
		tempAlias = 'shapeSvg';
	}
	return BLOCK_SELECTOR.container[ tempAlias ].fullSelector(
		uidClass,
		shapeClass
	);
}

function composeSelectors( selectors, blockName, uidClass ) {
	let css = '',
		finalSelector;
	for ( const selectorAlias in selectors ) {
		if ( isShapeAlias( selectorAlias ) ) {
			finalSelector = shapeFinalSelector( selectorAlias, uidClass );
		} else {
			finalSelector = getBlockFullSelector(
				blockName,
				selectorAlias,
				uidClass
			);
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
	const css = defaultCss();

	for ( const device in cssState ) {
		css[ device ] += composeSelectors(
			cssState[ device ],
			blockName,
			uidClass
		);
	}
	return buildMediaQueryCss( css, currentDevice );
}

function buildMediaQueryCss( cssState, currentDevice ) {
	let css = cssState[ ALL_DEVICES ];
	for ( let i = 0; i < scblocksMediaQuery.length; i++ ) {
		if ( currentDevice === scblocksMediaQuery[ i ].name ) {
			css += cssState[ currentDevice ];
			return css;
		}
		const device = scblocksMediaQuery[ i ].name;
		css += cssState[ device ];
	}
	return css;
}

function defaultCss() {
	const css = {
		[ ALL_DEVICES ]: '',
	};
	Object.values( scblocksMediaQuery ).forEach( ( elm ) => {
		css[ elm.name ] = '';
	} );
	return css;
}
