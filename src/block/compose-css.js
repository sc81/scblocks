/**
 * Internal dependencies
 */
import {
	MEDIUM_DEVICES_MQ,
	SMALL_DEVICES_MQ,
	ALL_DEVICES,
	MEDIUM_DEVICES,
	SMALL_DEVICES,
	PLUGIN_NAME,
	LARGE_DEVICES,
} from '../constants';

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

function composeSelectors( selectors, blockName, uidClass ) {
	let css = '',
		finalSelector;
	const leadingSelector = `.${ blockName.replace( '/', '-' ) }.${ uidClass }`;

	for ( const selector in selectors ) {
		if ( ! selectors[ selector ].props ) {
			continue;
		}
		if ( selector === 'selector' ) {
			finalSelector = leadingSelector;
		} else if ( selector === 'selector:hover' ) {
			finalSelector = leadingSelector + ':hover';
		} else {
			finalSelector = `${ leadingSelector } ${ selector }`;
		}

		css += `${ finalSelector }{${ composePropValue(
			selectors[ selector ].props
		) }}`;
	}
	return css;
}
export function composeCss( {
	css: cssState,
	name: blockName,
	uidClass,
	devices: currentDevices,
} ) {
	const css = {
		[ ALL_DEVICES ]: '',
		[ LARGE_DEVICES ]: '',
		[ MEDIUM_DEVICES ]: '',
		[ SMALL_DEVICES ]: '',
	};
	let width;

	for ( const devices in cssState ) {
		css[ devices ] += composeSelectors(
			cssState[ devices ],
			blockName,
			uidClass
		);
		if (
			devices !== ALL_DEVICES &&
			devices !== LARGE_DEVICES &&
			css[ devices ]
		) {
			width =
				devices === MEDIUM_DEVICES
					? MEDIUM_DEVICES_MQ
					: SMALL_DEVICES_MQ;
			css[
				devices
			] = `@media(max-width:${ width }px){${ css[ devices ] }}`;
		}
	}

	if ( currentDevices === LARGE_DEVICES ) {
		return css[ ALL_DEVICES ] + css[ LARGE_DEVICES ];
	} else if ( currentDevices === MEDIUM_DEVICES ) {
		return (
			css[ ALL_DEVICES ] + css[ LARGE_DEVICES ] + css[ MEDIUM_DEVICES ]
		);
	}
	return (
		css[ ALL_DEVICES ] +
		css[ LARGE_DEVICES ] +
		css[ MEDIUM_DEVICES ] +
		css[ SMALL_DEVICES ]
	);
}
