/**
 * WordPress dependencies
 */
import { useState } from '@wordpress/element';
import { withDispatch, withSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { PanelBody, Spinner, SelectControl } from '@wordpress/components';
import apiFetch from '@wordpress/api-fetch';

/**
 * Internal dependencies
 */
import {
	STORE_NAME,
	GOOGLE_FONTS_LINK_ID,
	PRIMARY_GOOGLE_FONT_VAR,
	SECONDARY_GOOGLE_FONT_VAR,
	TERTIARY_GOOGLE_FONT_VAR,
	FONTS_VARS_STYLE_ID,
	PLUGIN_NAME,
} from '../constants';

let googleFonts;

function refreshGoogleFontsLink( fonts ) {
	const apiUrl = [];

	fonts.forEach( ( font ) => {
		if ( font ) {
			apiUrl.push( font.replace( / /g, '+' ) );
			apiUrl.push( '|' );
		}
	} );
	if ( apiUrl.length && apiUrl[ apiUrl.length - 1 ] === '|' ) {
		apiUrl.pop();
	}
	if ( apiUrl.length ) {
		apiUrl.unshift( 'https://fonts.googleapis.com/css?family=' );
	}
	const url = apiUrl.join( '' );

	if ( url ) {
		let link = document.body.querySelector( '#' + GOOGLE_FONTS_LINK_ID );
		if ( ! link ) {
			link = document.createElement( 'link' );
			link.setAttribute( 'rel', 'stylesheet' );
			link.setAttribute( 'id', GOOGLE_FONTS_LINK_ID );
			link.setAttribute( 'href', url );
			document.body.appendChild( link );
		} else {
			link.setAttribute( 'href', url );
		}
	}
}

function Fonts( { fonts, onChangeFonts, onChangeFontsCssVars } ) {
	const [ isLocked, setIsLocked ] = useState( false );

	function refreshStyle( nextFonts ) {
		let cssVars = '';
		if ( nextFonts.primary ) {
			cssVars += `${ PRIMARY_GOOGLE_FONT_VAR }:'${ nextFonts.primary }';`;
		}
		if ( nextFonts.secondary ) {
			cssVars += `${ SECONDARY_GOOGLE_FONT_VAR }:'${ nextFonts.secondary }';`;
		}
		if ( nextFonts.tertiary ) {
			cssVars += `${ TERTIARY_GOOGLE_FONT_VAR }:'${ nextFonts.tertiary }';`;
		}
		if ( cssVars ) {
			cssVars = `:root{${ cssVars }}`;
		}
		let style = document.body.querySelector( '#' + FONTS_VARS_STYLE_ID );
		if ( style ) {
			style.textContent = cssVars;
		} else {
			style = document.createElement( 'style' );
			style.setAttribute( 'id', FONTS_VARS_STYLE_ID );
			style.textContent = cssVars;
			document.body.appendChild( style );
		}

		onChangeFontsCssVars( cssVars );
	}

	function onChange( type, value ) {
		const nextFonts = {
			...fonts,
			[ type ]: value,
		};
		refreshStyle( nextFonts );
		refreshGoogleFontsLink( Object.values( nextFonts ) );
		onChangeFonts( { ...nextFonts } );
	}

	if ( ! googleFonts ) {
		if ( ! isLocked ) {
			apiFetch( {
				path: `/${ PLUGIN_NAME }/v1/google-fonts`,
			} )
				.then( ( resp ) => {
					googleFonts = [ '', ...JSON.parse( resp ) ];
					setIsLocked( true );
				} )
				.catch( () => {
					setIsLocked( true );
				} );
		}
		return <Spinner />;
	}
	return (
		<PanelBody title={ __( 'Fonts' ) } opened={ true }>
			<SelectControl
				label={ __( 'Primary font' ) }
				value={ fonts.primary }
				options={ googleFonts.map( ( font ) => ( {
					label: font,
					value: font,
				} ) ) }
				onChange={ ( value ) => onChange( 'primary', value ) }
			/>
			<SelectControl
				label={ __( 'Secondary font' ) }
				value={ fonts.secondary }
				options={ googleFonts.map( ( font ) => ( {
					label: font,
					value: font,
				} ) ) }
				onChange={ ( value ) => onChange( 'secondary', value ) }
			/>
			<SelectControl
				label={ __( 'Tertiary font' ) }
				value={ fonts.tertiary }
				options={ googleFonts.map( ( font ) => ( {
					label: font,
					value: font,
				} ) ) }
				onChange={ ( value ) => onChange( 'tertiary', value ) }
			/>
		</PanelBody>
	);
}
export default withSelect( ( select ) => {
	return {
		fonts: select( STORE_NAME ).getFonts(),
	};
} )(
	withDispatch( ( dispatch ) => {
		return {
			onChangeFonts( value ) {
				dispatch( STORE_NAME ).setFonts( value );
			},
			onChangeFontsCssVars( value ) {
				dispatch( STORE_NAME ).setFontsCssVars( value );
			},
		};
	} )( Fonts )
);
