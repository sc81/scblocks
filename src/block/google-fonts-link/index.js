/**
 * WordPress dependencies
 */

import { useSelect } from '@wordpress/data';
import { useEffect, useState } from '@wordpress/element';
import { applyFilters } from '@wordpress/hooks';

/**
 * ScBlocks dependencies
 */
import { STORE_NAME } from '@scblocks/constants';

let id = 0;
let previousUrl;

const urlPrefix = 'https://fonts.googleapis.com/css?family=';

export default function GoogleFontsLink( { clientId } ) {
	const siteFonts = useSelect(
		( store ) => store( STORE_NAME ).getSiteGoogleFonts(),
		[]
	);
	const [ url, setUrl ] = useState();
	const [ css, setCss ] = useState();

	const finalFonts = applyFilters( 'scblocks.editor.googleFonts', siteFonts );

	useEffect(
		() => () => {
			id = 0;
		},
		[]
	);

	useEffect( () => {
		let tempCss = '';
		const fonts = [];
		if ( finalFonts ) {
			Object.keys( finalFonts ).forEach( ( font ) => {
				const name = finalFonts[ font ].name;
				const variants = finalFonts[ font ].variants;
				if ( name ) {
					tempCss += `--scblocks-${ font }-google-font:'${ name }';`;

					let fontRequest = name;
					if ( variants && variants.length ) {
						fontRequest += `:${ variants.join( ',' ) }`;
					}
					fonts.push( fontRequest );
				}
			} );
		}
		if ( tempCss ) {
			tempCss = `:root{${ tempCss }}`;
		}
		setCss( tempCss );

		const suffix = fonts.join( '|' );

		let tempUrl = '';
		if ( suffix ) {
			tempUrl = urlPrefix + suffix;
			if ( previousUrl !== tempUrl ) {
				id = 0;
				previousUrl = tempUrl;
			}
		} else {
			id = 0;
		}
		setUrl( tempUrl );
	}, [ finalFonts ] );

	if ( ! url || ( id !== 0 && id !== clientId ) ) {
		return null;
	}
	id = clientId;

	return (
		<>
			<link rel="stylesheet" href={ url } />
			<style>{ css }</style>
		</>
	);
}
