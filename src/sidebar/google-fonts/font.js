/**
 * WordPress dependencies
 */
import { TextControl, CheckboxControl } from '@wordpress/components';
import { useState } from '@wordpress/element';

export default function Font( {
	fontData = { name: '' },
	setFontData,
	label,
	googleFonts,
} ) {
	const [ tempValue, setTempValue ] = useState( fontData.name );
	function setFont( value ) {
		const next = {};
		if ( googleFonts[ value ] ) {
			next.name = value;
			next.variants = [];
			if ( fontData.variants ) {
				next.variants = [ ...fontData.variants ];
			}
		}
		setTempValue( value );
		setFontData( next );
	}
	function setVariant( name, value ) {
		const next = {
			name: fontData.name,
		};
		let variants = [];
		if ( fontData.variants ) {
			variants = [ ...fontData.variants ];
		}
		if ( value ) {
			next.variants = [ ...variants, name ];
		} else {
			next.variants = variants.filter( ( elm ) => elm !== name );
		}
		setFontData( next );
	}
	return (
		<>
			<TextControl
				label={ label }
				value={ tempValue }
				onChange={ setFont }
			/>
			{ googleFonts &&
				googleFonts[ fontData.name ] &&
				googleFonts[ fontData.name ].variants.map( ( variant ) => {
					return (
						<CheckboxControl
							key={ variant }
							label={ variant }
							checked={ fontData.variants?.includes( variant ) }
							onChange={ ( value ) =>
								setVariant( variant, value )
							}
						/>
					);
				} ) }
		</>
	);
}
