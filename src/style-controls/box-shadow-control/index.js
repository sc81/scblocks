/**
 * WordPress dependencies
 */
import { BaseControl, Button, ButtonGroup } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';

/**
 * ScBlocks dependencies
 */
import { NumberUnit, OpenColorPicker } from '@scblocks/components';

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
				label={ __( 'Color', 'scblocks' ) }
				value={ color }
				onChange={ ( v ) => onChangeValue( v, 'color' ) }
			/>
			<NumberUnit
				label={ __( 'Horizontal', 'scblocks' ) }
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
				withoutSelectDevices
			/>
			<NumberUnit
				label={ __( 'Vertical', 'scblocks' ) }
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
				withoutSelectDevices
			/>
			<NumberUnit
				label={ __( 'Blur', 'scblocks' ) }
				value={ blur }
				units={ [ 'px', 'em' ] }
				onChange={ ( v ) => onChangeValue( v, 'blur' ) }
				withoutSelectDevices
			/>
			<NumberUnit
				label={ __( 'Spread', 'scblocks' ) }
				value={ spread }
				units={ [ 'px', 'em' ] }
				onChange={ ( v ) => onChangeValue( v, 'spread' ) }
				withoutSelectDevices
			/>
			<BaseControl>
				<BaseControl.VisualLabel>
					{ __( 'Position', 'scblocks' ) }
				</BaseControl.VisualLabel>
				<ButtonGroup>
					<Button
						isSmall
						isPrimary={ inset === 'inset' }
						aria-pressed={ inset === 'inset' }
						onClick={ () => onChangeValue( 'inset', 'inset' ) }
					>
						{ __( 'Inner', 'scblocks' ) }
					</Button>
					<Button
						isSmall
						isPrimary={ inset === '' }
						aria-pressed={ inset === '' }
						onClick={ () => onChangeValue( '', 'inset' ) }
					>
						{ __( 'Outer', 'scblocks' ) }
					</Button>
				</ButtonGroup>
			</BaseControl>
		</>
	);
}
