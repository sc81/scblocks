/**
 * WordPress dependencies
 */

import { useSelect } from '@wordpress/data';
import { useEffect } from '@wordpress/element';

/**
 * ScBlocks dependencies
 */
import { STORE_NAME } from '@scblocks/constants';

let style;
let link;

const urlPrefix = 'https://fonts.googleapis.com/css?family=';

export default function useGoogleFonts() {
	const siteGoogleFonts = useSelect( ( store ) => {
		return store( STORE_NAME ).getSiteGoogleFonts();
	}, [] );

	useEffect( () => {
		if ( ! style ) {
			style = document.createElement( 'style' );
			document.head.appendChild( style );
		}
		if ( ! link ) {
			link = document.createElement( 'link' );
			link.setAttribute( 'rel', 'stylesheet' );
			document.head.appendChild( link );
		}
		let css = '';
		const fonts = [];
		if ( siteGoogleFonts ) {
			Object.keys( siteGoogleFonts ).forEach( ( font ) => {
				const name = siteGoogleFonts[ font ].name;
				const variants = siteGoogleFonts[ font ].variants;
				if ( name ) {
					css += `--scblocks-${ font }-google-font:${ name };`;

					let fontRequest = name;
					if ( variants && variants.length ) {
						fontRequest += `:${ variants.join( ',' ) }`;
					}
					fonts.push( fontRequest );
				}
			} );
		}
		if ( css ) {
			css = `:root{${ css }}`;
		}
		const suffix = fonts.join( '|' );
		let url = '';
		if ( suffix ) {
			url = urlPrefix + suffix;
		}
		link.setAttribute( 'href', url );

		style.textContent = css;
	}, [ siteGoogleFonts ] );
}
