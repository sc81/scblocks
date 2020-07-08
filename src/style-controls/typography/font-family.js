/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { withSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import {
	STORE_NAME,
	PRIMARY_GOOGLE_FONT_VAR,
	SECONDARY_GOOGLE_FONT_VAR,
	TERTIARY_GOOGLE_FONT_VAR,
} from '../../constants';
import SelectWithOptgroup from '../../components/select-with-optgroup';

const systemOptions = [
	{ label: __( 'Default' ), value: '' },
	{ label: 'Arial', value: "'Arial',sans-serif" },
	{ label: 'Georgia', value: "'Georgia',sans-serif" },
	{ label: 'Helvetica', value: "'Helvetica',sans-serif" },
	{ label: 'Tahoma', value: "'Tahoma',sans-serif" },
	{ label: 'Times New Roman', value: "'Times New Roman',sans-serif" },
	{ label: 'Trebuchet MS', value: "'Trebuchet MS',sans-serif" },
	{ label: 'Verdana', value: "'Verdana',sans-serif" },
	{ label: 'monospace', value: 'monospace' },
];

function FontFamily( { value, onChange, fonts } ) {
	function onChangeFamily( val ) {
		if ( val && val === fonts.primary ) {
			onChange( `var(${ PRIMARY_GOOGLE_FONT_VAR })` );
		} else if ( val && val === fonts.secondary ) {
			onChange( `var(${ SECONDARY_GOOGLE_FONT_VAR })` );
		} else if ( val && val === fonts.tertiary ) {
			onChange( `var(${ TERTIARY_GOOGLE_FONT_VAR })` );
		} else {
			onChange( val );
		}
	}
	const googleFonts = [];
	Object.values( fonts ).forEach( ( element ) => {
		if ( element ) {
			googleFonts.push( element );
		}
	} );
	let currentFont;
	if ( /var\(/.test( value ) ) {
		if ( value.includes( PRIMARY_GOOGLE_FONT_VAR ) ) {
			currentFont = fonts.primary;
		} else if ( value.includes( SECONDARY_GOOGLE_FONT_VAR ) ) {
			currentFont = fonts.secondary;
		} else if ( value.includes( TERTIARY_GOOGLE_FONT_VAR ) ) {
			currentFont = fonts.tertiary;
		}
	} else {
		currentFont = value;
	}

	return (
		<SelectWithOptgroup
			label={ __( 'Font family' ) }
			value={ currentFont }
			onChange={ onChangeFamily }
			optgroups={ [
				{
					label: __( 'System' ),
					options: systemOptions,
				},
				{
					label: __( 'Google' ),
					options: googleFonts.map( ( font ) => ( {
						label: font,
						value: font,
					} ) ),
				},
			] }
		/>
	);
}
export default withSelect( ( select ) => {
	return {
		fonts: select( STORE_NAME ).getFonts(),
	};
} )( FontFamily );
