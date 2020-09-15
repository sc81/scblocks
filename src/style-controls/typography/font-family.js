/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';
import {
	ButtonGroup,
	Button,
	TextControl,
	CheckboxControl,
	Spinner,
} from '@wordpress/components';
import apiFetch from '@wordpress/api-fetch';

/**
 * Internal dependencies
 */
import ControlWrapper from '../../components/control-wrapper';
import { PLUGIN_NAME, ALL_DEVICES } from '../../constants';
import { setPropValue } from '../../utils';

let GOOGLE_FONTS;

function validText( value ) {
	if ( value.replace( /[A-Za-z0-9 "'-]/g, '' ).length ) {
		return false;
	}
	if ( /"/.test( value ) ) {
		const match = value.match( '"' );
		if ( match.length % 2 === 1 ) {
			return false;
		}
	}
	if ( /'/.test( value ) ) {
		const match = value.match( "'" );
		if ( match.length % 2 === 1 ) {
			return false;
		}
	}
	return true;
}
let isLocked = false;

export default function FontFamily( { attributes, setAttributes, selector } ) {
	const {
		googleFont,
		googleFontVariants,
		fontFamilyFallback,
		fontFamily,
	} = attributes;
	const [
		isGoogleFontControlVisible,
		setIsGoogleFontControlVisible,
	] = useState( googleFont );
	const [ tempFontFamilyFallback, setTempFontFamilyFallback ] = useState(
		fontFamilyFallback
	);
	const [ tempFontFamily, setTempFontFamily ] = useState( fontFamily );
	const [ tempGoogleFont, setTempGoogleFont ] = useState(
		googleFont ? fontFamily : ''
	);
	const [ tempGoogleFontFallback, setTempGoogleFontFallback ] = useState(
		googleFont ? fontFamilyFallback : ''
	);
	const [ hasGoogleFonts, setHasGoogleFonts ] = useState( !! GOOGLE_FONTS );

	const googleFontVariantsArray = googleFontVariants.split( ',' );

	useEffect( () => {
		if ( ! isLocked && ! GOOGLE_FONTS ) {
			isLocked = true;
			apiFetch( {
				path: `/${ PLUGIN_NAME }/v1/google-fonts`,
			} )
				.then( ( resp ) => {
					GOOGLE_FONTS = JSON.parse( resp );
					setHasGoogleFonts( true );
					isLocked = false;
				} )
				.catch( () => {
					isLocked = false;
				} );
		}
	}, [] );

	function setControlsVisibility( value ) {
		setIsGoogleFontControlVisible( value );
		if ( value ) {
			if ( GOOGLE_FONTS ) {
				setGoogleFontAttrs( tempGoogleFont );
			}
		} else {
			setAttributes( {
				googleFont: false,
				googleFontVariants: '',
			} );
			setAnyFontAttr( tempFontFamily, tempFontFamilyFallback );
		}
	}
	function setGoogleFontAttrs( value ) {
		if ( GOOGLE_FONTS[ value ] ) {
			setTempGoogleFontFallback( GOOGLE_FONTS[ value ].fallback );
			setAttributes( {
				fontFamily: value,
				googleFont: true,
				fontFamilyFallback: GOOGLE_FONTS[ value ].fallback,
				googleFontVariants: GOOGLE_FONTS[ value ].variants.join( ',' ),
			} );
			setPropValue( {
				attributes,
				setAttributes,
				selector,
				devices: ALL_DEVICES,
				propName: 'fontFamily',
				value: `${ value },${ GOOGLE_FONTS[ value ].fallback }`,
			} );
		} else {
			setAttributes( {
				googleFont: false,
				googleFontVariants: '',
			} );
			setAnyFontAttr( '', '' );
		}
	}
	function setAnyFontAttr( nextFontFamily, nextFontFallback ) {
		let cssFontFamily = '';
		if ( validText( nextFontFamily ) ) {
			setAttributes( {
				fontFamily: nextFontFamily,
			} );
			cssFontFamily = nextFontFamily;
		}
		if ( validText( nextFontFallback ) ) {
			if ( ! nextFontFamily ) {
				nextFontFallback = '';
			}
			setAttributes( {
				fontFamilyFallback: nextFontFallback,
			} );
			if ( cssFontFamily ) {
				if ( nextFontFallback ) {
					nextFontFallback = `,${ nextFontFallback }`;
				}
				cssFontFamily = cssFontFamily + nextFontFallback;
			}
		}
		// css fontFamily
		setPropValue( {
			attributes,
			setAttributes,
			selector,
			devices: ALL_DEVICES,
			propName: 'fontFamily',
			value: cssFontFamily,
		} );
	}
	function onChangeGoogleFont( value ) {
		setTempGoogleFont( value );
		setGoogleFontAttrs( value );
	}
	function onChangeFontVariant( variantName, value ) {
		let nextVariants;
		if ( value ) {
			nextVariants = `${ googleFontVariantsArray.join(
				','
			) },${ variantName }`;
		} else {
			nextVariants = googleFontVariantsArray
				.filter( ( elm ) => elm !== variantName )
				.join( ',' );
		}
		setAttributes( {
			googleFontVariants: nextVariants,
		} );
	}
	function onClear() {
		setAttributes( {
			fontFamily: '',
			googleFont: false,
			fontFamilyFallback: '',
			googleFontVariants: '',
		} );
		// css fontFamily
		setPropValue( {
			attributes,
			setAttributes,
			selector,
			devices: ALL_DEVICES,
			propName: 'fontFamily',
			value: '',
		} );

		setTempFontFamily( '' );
		setTempFontFamilyFallback( '' );
		setTempGoogleFont( '' );
		setTempGoogleFontFallback( '' );
	}

	return (
		<ControlWrapper
			label={ __( 'Font Family', 'scblocks' ) }
			withoutSelectDevices
			displayClearButton={ !! fontFamily }
			onClear={ onClear }
		>
			<ButtonGroup className={ `${ PLUGIN_NAME }-button-group two` }>
				<Button
					isSmall
					isPrimary={ ! isGoogleFontControlVisible }
					aria-pressed={ ! isGoogleFontControlVisible }
					onClick={ () => setControlsVisibility( false ) }
				>
					<span>{ __( 'Any Font', 'scblocks' ) }</span>
				</Button>
				<Button
					isSmall
					isPrimary={ isGoogleFontControlVisible }
					aria-pressed={ isGoogleFontControlVisible }
					onClick={ () => setControlsVisibility( true ) }
				>
					<span>{ __( 'Google Font', 'scblocks' ) }</span>
				</Button>
			</ButtonGroup>
			{ ! isGoogleFontControlVisible && (
				<>
					<TextControl
						label={ __( 'Font Name', 'scblocks' ) }
						value={ tempFontFamily }
						onChange={ ( value ) => {
							setTempFontFamily( value );
							setAnyFontAttr( value, fontFamilyFallback );
						} }
					/>
					<TextControl
						label={ __( 'Font Family Fallback', 'scblocks' ) }
						value={ tempFontFamilyFallback }
						onChange={ ( value ) => {
							setTempFontFamilyFallback( value );
							setAnyFontAttr( fontFamily, value );
						} }
					/>
				</>
			) }
			{ isGoogleFontControlVisible && ! hasGoogleFonts && <Spinner /> }
			{ isGoogleFontControlVisible && hasGoogleFonts && (
				<>
					<TextControl
						label={ __( 'Google Font Name', 'scblocks' ) }
						value={ tempGoogleFont }
						onChange={ ( value ) => onChangeGoogleFont( value ) }
					/>
					{ GOOGLE_FONTS[ tempGoogleFont ] && (
						<p>{ __( 'Google Font Variants', 'scblocks' ) }</p>
					) }
					{ GOOGLE_FONTS[ tempGoogleFont ] &&
						GOOGLE_FONTS[ tempGoogleFont ].variants.map(
							( variant ) => {
								return (
									<CheckboxControl
										key={ variant }
										label={ variant }
										checked={ googleFontVariantsArray.includes(
											variant
										) }
										onChange={ ( value ) =>
											onChangeFontVariant(
												variant,
												value
											)
										}
									/>
								);
							}
						) }
					<TextControl
						label={ __( 'Google Font Fallback', 'scblocks' ) }
						value={ tempGoogleFontFallback }
						onChange={ ( value ) => {
							setTempGoogleFontFallback( value );
							setAnyFontAttr( fontFamily, value );
						} }
					/>
				</>
			) }
		</ControlWrapper>
	);
}
