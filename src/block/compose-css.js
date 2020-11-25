/**
 * Internal dependencies
 */
import {
	ALL_DEVICES,
	TABLET_DEVICE,
	MOBILE_DEVICE,
	PLUGIN_NAME,
	DESKTOP_DEVICE,
} from '../constants';
import { BLOCK_SELECTOR } from './constants';

function standardizeName( name ) {
	if ( name.includes( 'Custom' ) ) {
		return `--${ PLUGIN_NAME }-${ name
			.replace( 'Custom', '' )
			.replace( /[A-Z]/g, ( e ) => '-' + e.toLowerCase() ) }`;
	}
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

function composeSelectors( selectorsObj, blockName, uidClass ) {
	let css = '';
	for ( const selectorAlias in selectorsObj ) {
		const finalSelector = BLOCK_SELECTOR[ blockName ][
			selectorAlias
		].fullSelector( uidClass );
		css += `.editor-styles-wrapper ${ finalSelector }{${ composePropValue(
			selectorsObj[ selectorAlias ]
		) }}`;
	}
	return css;
}
export function composeCss( {
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
