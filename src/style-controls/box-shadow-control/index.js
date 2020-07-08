/**
 * WordPress dependencies
 */
import { BaseControl, Button, ButtonGroup } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import NumberUnit from '../../components/number-unit';
import OpenColorPicker from '../../components/open-color-picker';

export default function BoxShadowControl( { value, onChange } ) {
	const [ state, setState ] = useState( () => {
		const st = {
			inset: '',
			offsetX: '',
			offsetY: '',
			blur: '',
			spread: '',
			color: '',
		};

		if ( ! value ) {
			return st;
		}
		let tempValue = value;

		if ( /inset/.test( tempValue ) ) {
			st.inset = 'inset';
			tempValue = tempValue.replace( 'inset', '' ).trim();
		}
		const color = tempValue.match(
			/rgba?\(.+?\)|hsla?\(.+?\)|#(?:[A-Fa-f0-9]{3}){1,2}/
		);
		if ( color ) {
			st.color = color[ 0 ];
			tempValue = tempValue.replace( color, '' ).trim();
		}
		const numbers = tempValue.split( ' ' );
		if ( numbers.length < 2 ) {
			return state;
		}
		st.offsetX = numbers[ 0 ];
		st.offsetY = numbers[ 1 ];
		if ( numbers[ 2 ] ) {
			st.blur = numbers[ 2 ];
		}
		if ( numbers[ 3 ] ) {
			st.spread = numbers[ 3 ];
		}
		return st;
	} );

	function onChangeValue( val, type ) {
		const nextState = {
			...state,
			[ type ]: val,
		};
		setState( nextState );

		let { offsetX, offsetY, blur, spread, color, inset } = nextState;
		let nextValue;

		if ( ! offsetX || ! offsetY ) {
			nextValue = '';
		} else {
			if ( inset ) {
				offsetX = ' ' + offsetX;
			} else {
				inset = '';
			}
			offsetY = ' ' + offsetY;

			if ( spread && ! blur ) {
				spread = '';
			}
			if ( blur ) {
				blur = ' ' + blur;
			}
			if ( spread ) {
				spread = ' ' + spread;
			}
			if ( color ) {
				color = ' ' + color;
			}
			nextValue = inset + offsetX + offsetY + blur + spread + color;
		}
		onChange( nextValue );
	}
	const { color, offsetX, offsetY, blur, spread, inset } = state;
	return (
		<>
			<OpenColorPicker
				label={ __( 'Color' ) }
				value={ color }
				onChange={ ( v ) => onChangeValue( v, 'color' ) }
			/>
			<NumberUnit
				label={ __( 'Horizontal' ) }
				value={ offsetX }
				units={ [ 'px', 'em' ] }
				onChange={ ( v ) => onChangeValue( v, 'offsetX' ) }
				unitRangeStep={ {
					px: {
						min: -100,
					},
					em: {
						min: -10,
					},
				} }
				noSelectDevices
			/>
			<NumberUnit
				label={ __( 'Vertical' ) }
				value={ offsetY }
				units={ [ 'px', 'em' ] }
				onChange={ ( v ) => onChangeValue( v, 'offsetY' ) }
				unitRangeStep={ {
					px: {
						min: -100,
					},
					em: {
						min: -10,
					},
				} }
				noSelectDevices
			/>
			<NumberUnit
				label={ __( 'Blur' ) }
				value={ blur }
				units={ [ 'px', 'em' ] }
				onChange={ ( v ) => onChangeValue( v, 'blur' ) }
				noSelectDevices
			/>
			<NumberUnit
				label={ __( 'Spread' ) }
				value={ spread }
				units={ [ 'px', 'em' ] }
				onChange={ ( v ) => onChangeValue( v, 'spread' ) }
				noSelectDevices
			/>
			<BaseControl>
				<BaseControl.VisualLabel>
					{ __( 'Position' ) }
				</BaseControl.VisualLabel>
				<ButtonGroup>
					<Button
						isSmall
						isPrimary={ inset === 'inset' }
						aria-pressed={ inset === 'inset' }
						onClick={ () => onChangeValue( 'inset', 'inset' ) }
					>
						{ __( 'Inner' ) }
					</Button>
					<Button
						isSmall
						isPrimary={ inset === '' }
						aria-pressed={ inset === '' }
						onClick={ () => onChangeValue( '', 'inset' ) }
					>
						{ __( 'Outer' ) }
					</Button>
				</ButtonGroup>
			</BaseControl>
		</>
	);
}
