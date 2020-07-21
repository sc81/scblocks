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
function prepareLeadingSelector( blockName, uidClass ) {
	let prefix = '';
	if ( blockName === `${ PLUGIN_NAME }/column` ) {
		prefix = `.${ PLUGIN_NAME }-columns `;
	}
	return `${ prefix }.${ blockName.replace( '/', '-' ) }.${ uidClass }`;
}

function composeSelectors(
	selectors,
	blockName,
	uidClass,
	editorBlockListSelector
) {
	let css = '',
		finalSelector;
	const leadingSelector = prepareLeadingSelector( blockName, uidClass );

	for ( const selector in selectors ) {
		if ( ! selectors[ selector ].props ) {
			continue;
		}
		if ( selector === 'selector' ) {
			finalSelector = leadingSelector;
			if ( editorBlockListSelector === selector ) {
				finalSelector = `${ finalSelector } > .block-editor-inner-blocks > .block-editor-block-list__layout`;
			}
		} else if ( selector === 'selector:hover' ) {
			finalSelector = leadingSelector + ':hover';
			if ( editorBlockListSelector === `${ selector }:hover` ) {
				finalSelector = `${ finalSelector } > .block-editor-inner-blocks > .block-editor-block-list__layout:hover`;
			}
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
	editorBlockListSelector,
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
			uidClass,
			editorBlockListSelector
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
