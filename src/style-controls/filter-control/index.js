/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useMemo } from '@wordpress/element';
/**
 * Internal dependencies
 */
import NumberControl from '../../components/number-control';

function prepareValue( value ) {
	if ( isNotEmpty( value ) ) {
		return parseFloat( value );
	}
	return value;
}

function isNotEmpty( value ) {
	return value !== undefined && value !== '' && value !== null;
}

export default function FilterControl( { value, onChange } ) {
	const state = useMemo( () => {
		const st = {
			blur: '',
			brightness: '',
			contrast: '',
			grayscale: '',
			invert: '',
			saturate: '',
			sepia: '',
			hue: '',
		};

		if ( /blur/.test( value ) ) {
			st.blur = prepareValue( value.match( /blur\((.+?)px\)/ )[ 1 ] );
		}
		if ( /brightness/.test( value ) ) {
			st.brightness = prepareValue(
				value.match( /brightness\((.+?)\)/ )[ 1 ]
			);
		}
		if ( /contrast/.test( value ) ) {
			st.contrast = prepareValue(
				value.match( /contrast\((.+?)\)/ )[ 1 ]
			);
		}
		if ( /grayscale/.test( value ) ) {
			st.grayscale = prepareValue(
				value.match( /grayscale\((.+?)\)/ )[ 1 ]
			);
		}
		if ( /invert/.test( value ) ) {
			st.invert = prepareValue( value.match( /invert\((.+?)\)/ )[ 1 ] );
		}
		if ( /saturate/.test( value ) ) {
			st.saturate = prepareValue(
				value.match( /saturate\((.+?)\)/ )[ 1 ]
			);
		}
		if ( /sepia/.test( value ) ) {
			st.sepia = prepareValue( value.match( /sepia\((.+?)\)/ )[ 1 ] );
		}
		if ( /hue-rotate/.test( value ) ) {
			st.hue = prepareValue(
				value.match( /hue-rotate\((.+?)deg\)/ )[ 1 ]
			);
		}
		return st;
	}, [ value ] );

	function onChangeValue( name, val ) {
		const nextState = {
			...state,
			[ name ]: val,
		};

		const {
			blur,
			brightness,
			contrast,
			grayscale,
			invert,
			saturate,
			sepia,
			hue,
		} = nextState;
		let nextValue = '';

		if ( isNotEmpty( blur ) ) {
			nextValue += `blur(${ blur }px) `;
		}
		if ( isNotEmpty( brightness ) ) {
			nextValue += `brightness(${ brightness }) `;
		}
		if ( isNotEmpty( contrast ) ) {
			nextValue += `contrast(${ contrast }) `;
		}
		if ( isNotEmpty( grayscale ) ) {
			nextValue += `grayscale(${ grayscale }) `;
		}
		if ( isNotEmpty( invert ) ) {
			nextValue += `invert(${ invert }) `;
		}
		if ( isNotEmpty( saturate ) ) {
			nextValue += `saturate(${ saturate }) `;
		}
		if ( isNotEmpty( sepia ) ) {
			nextValue += `sepia(${ sepia }) `;
		}
		if ( isNotEmpty( hue ) ) {
			nextValue += `hue-rotate(${ hue }deg) `;
		}
		nextValue = nextValue.trim();

		onChange( nextValue );
	}

	const {
		blur,
		brightness,
		contrast,
		grayscale,
		invert,
		saturate,
		sepia,
		hue,
	} = state;

	return (
		<>
			<NumberControl
				label={ __( 'Blur', 'scblocks' ) }
				value={ blur }
				onChange={ ( v ) => onChangeValue( 'blur', v ) }
				min={ 0 }
				max={ 10 }
				step={ 0.1 }
				withoutSelectDevices
			/>
			<NumberControl
				label={ __( 'Brightness', 'scblocks' ) }
				value={ brightness }
				onChange={ ( v ) => onChangeValue( 'brightness', v ) }
				min={ 0 }
				max={ 5 }
				step={ 0.1 }
				withoutSelectDevices
			/>
			<NumberControl
				label={ __( 'Contrast', 'scblocks' ) }
				value={ contrast }
				onChange={ ( v ) => onChangeValue( 'contrast', v ) }
				min={ 0 }
				max={ 10 }
				step={ 0.1 }
				withoutSelectDevices
			/>
			<NumberControl
				label={ __( 'Grayscale', 'scblocks' ) }
				value={ grayscale }
				onChange={ ( v ) => onChangeValue( 'grayscale', v ) }
				min={ 0 }
				max={ 1 }
				step={ 0.01 }
				withoutSelectDevices
			/>
			<NumberControl
				label={ __( 'Invert', 'scblocks' ) }
				value={ invert }
				onChange={ ( v ) => onChangeValue( 'invert', v ) }
				min={ 0 }
				max={ 1 }
				step={ 0.01 }
				withoutSelectDevices
			/>
			<NumberControl
				label={ __( 'Saturate', 'scblocks' ) }
				value={ saturate }
				onChange={ ( v ) => onChangeValue( 'saturate', v ) }
				min={ 0 }
				max={ 10 }
				step={ 0.1 }
				withoutSelectDevices
			/>
			<NumberControl
				label={ __( 'Sepia', 'scblocks' ) }
				value={ sepia }
				onChange={ ( v ) => onChangeValue( 'sepia', v ) }
				min={ 0 }
				max={ 1 }
				step={ 0.01 }
				withoutSelectDevices
			/>
			<NumberControl
				label={ __( 'Hue', 'scblocks' ) }
				value={ hue }
				onChange={ ( v ) => onChangeValue( 'hue', v ) }
				min={ 0 }
				max={ 360 }
				step={ 1 }
				withoutSelectDevices
			/>
		</>
	);
}
