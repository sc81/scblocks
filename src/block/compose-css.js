/**
 * Internal dependencies
 */
import {
	ALL_DEVICES,
	TABLET_DEVICES,
	MOBILE_DEVICES,
	PLUGIN_NAME,
	DESKTOP_DEVICES,
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
		css += `${ finalSelector }{${ composePropValue(
			selectorsObj[ selectorAlias ]
		) }}`;
	}
	return css;
}
export function composeCss( {
	css: cssState,
	blockName,
	uidClass,
	devices: currentDevices,
} ) {
	const css = {
		[ ALL_DEVICES ]: '',
		[ DESKTOP_DEVICES ]: '',
		[ TABLET_DEVICES ]: '',
		[ MOBILE_DEVICES ]: '',
	};

	for ( const devices in cssState ) {
		css[ devices ] += composeSelectors(
			cssState[ devices ],
			blockName,
			uidClass
		);
	}

	if ( currentDevices === DESKTOP_DEVICES ) {
		return css[ ALL_DEVICES ] + css[ DESKTOP_DEVICES ];
	} else if ( currentDevices === TABLET_DEVICES ) {
		return (
			css[ ALL_DEVICES ] + css[ DESKTOP_DEVICES ] + css[ TABLET_DEVICES ]
		);
	}
	return (
		css[ ALL_DEVICES ] +
		css[ DESKTOP_DEVICES ] +
		css[ TABLET_DEVICES ] +
		css[ MOBILE_DEVICES ]
	);
}
