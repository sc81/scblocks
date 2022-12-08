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

/* global scblocksMediaQuery, scblocksSelectorsPriority */

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
	if ( BLOCK_SELECTOR[ blockName ] && BLOCK_SELECTOR[ blockName ][ alias ] ) {
		return BLOCK_SELECTOR[ blockName ][ alias ].blockSelector( uidClass );
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
	return BLOCK_SELECTOR.container[ tempAlias ].blockSelector(
		uidClass,
		shapeClass
	);
}

function getElementSelector( blockName, selectorAlias, uidClass ) {
	if ( isShapeAlias( selectorAlias ) ) {
		return shapeFinalSelector( selectorAlias, uidClass );
	}
	return getBlockFullSelector( blockName, selectorAlias, uidClass );
}

function composeSelectors( selectors, blockName, uidClass ) {
	let css = '';
	const aliases = Object.keys( selectors );
	if ( scblocksSelectorsPriority[ blockName ] ) {
		aliases.sort( ( a, b ) => {
			return (
				( scblocksSelectorsPriority[ blockName ][ a ] || 10 ) -
				( scblocksSelectorsPriority[ blockName ][ b ] || 10 )
			);
		} );
	}
	aliases.forEach( ( alias ) => {
		const elementSelector = getElementSelector(
			blockName,
			alias,
			uidClass
		);
		css += `.editor-styles-wrapper ${ elementSelector }{${ composePropValue(
			selectors[ alias ]
		) }}`;
	} );
	return css;
}
export default function composeCss( {
	css: cssState,
	blockName,
	uidClass,
	device: currentDevice,
} ) {
	const css = initCssState();

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

function initCssState() {
	const css = {
		[ ALL_DEVICES ]: '',
	};
	Object.values( scblocksMediaQuery ).forEach( ( elm ) => {
		css[ elm.name ] = '';
	} );
	return css;
}
