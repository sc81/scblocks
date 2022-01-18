/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import Font from './font';

export default function GoogleFontsControls( {
	fontsData = {},
	googleFonts,
	setFontsData,
} ) {
	function setFontData( name, value ) {
		setFontsData( {
			...fontsData,
			[ name ]: value,
		} );
	}
	return (
		<>
			<Font
				label={ __( 'Primary font', 'scblocks' ) }
				fontData={ fontsData.primary }
				setFontData={ ( value ) => setFontData( 'primary', value ) }
				googleFonts={ googleFonts }
			/>
			<Font
				label={ __( 'Secondary font', 'scblocks' ) }
				fontData={ fontsData.secondary }
				setFontData={ ( value ) => setFontData( 'secondary', value ) }
				googleFonts={ googleFonts }
			/>
			<Font
				label={ __( 'Tertiary font', 'scblocks' ) }
				fontData={ fontsData.tertiary }
				setFontData={ ( value ) => setFontData( 'tertiary', value ) }
				googleFonts={ googleFonts }
			/>
		</>
	);
}
