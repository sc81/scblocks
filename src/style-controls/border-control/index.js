/**
 * WordPress dependencies
 */
import { SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';

/**
 * ScBlocks dependencies
 */
import {
	OpenColorPicker,
	NumberUnit,
	ControlWrapper,
	LinkSides,
} from '@scblocks/components';
import {
	getPropertiesValue,
	setPropsForVariousDevices,
	setPropsValue,
} from '@scblocks/css-utils';
import { ALL_DEVICES } from '@scblocks/constants';

export default function BorderControl( {
	attributes,
	devices,
	selector,
	setAttributes,
} ) {
	const [ isLinked, setIsLinked ] = useState( false );
	let {
		borderWidth,
		borderTopWidth: top,
		borderRightWidth: right,
		borderBottomWidth: bottom,
		borderLeftWidth: left,
	} = getPropertiesValue( {
		attributes,
		devices,
		selector,
		props: [
			'borderWidth',
			'borderTopWidth',
			'borderRightWidth',
			'borderBottomWidth',
			'borderLeftWidth',
		],
	} );
	const { borderColor: color, borderStyle: style } = getPropertiesValue( {
		attributes,
		devices: ALL_DEVICES,
		selector,
		props: [ 'borderColor', 'borderStyle' ],
	} );

	if ( borderWidth ) {
		const value = borderWidth.split( ' ' );
		if ( value.length === 1 ) {
			top = right = bottom = left = value[ 0 ];
		}
		if ( value.length === 2 ) {
			top = bottom = value[ 0 ];
			right = left = value[ 1 ];
		}
		if ( value.length === 4 ) {
			top = value[ 0 ];
			right = value[ 1 ];
			bottom = value[ 2 ];
			left = value[ 3 ];
		}
	}
	function onChange( value ) {
		setPropsForVariousDevices( {
			attributes,
			setAttributes,
			selector,
			props: {
				[ ALL_DEVICES ]: {
					borderColor: value.borderColor,
					borderStyle: value.borderStyle,
				},
				[ devices ]: {
					borderWidth: value.borderWidth,
					borderTopWidth: value.borderTopWidth,
					borderRightWidth: value.borderRightWidth,
					borderBottomWidth: value.borderBottomWidth,
					borderLeftWidth: value.borderLeftWidth,
				},
			},
		} );
	}

	function onChangeWidth( position, value ) {
		let nextState;
		if ( isLinked ) {
			nextState = {
				style,
				color,
				top: value,
				right: value,
				bottom: value,
				left: value,
			};
		} else {
			nextState = {
				style,
				color,
				top,
				right,
				bottom,
				left,
				[ position ]: value,
			};
		}
		setValue( nextState );
	}

	function onChangeColor( value ) {
		setValue( {
			style,
			color: value,
			right,
			left,
			top,
			bottom,
		} );
	}
	function onChangeStyle( value ) {
		setValue( {
			style: value,
			color,
			right,
			left,
			top,
			bottom,
		} );
	}

	function setValue( next ) {
		if ( next.top && next.right && next.bottom && next.left ) {
			let value;
			if (
				next.top === next.right &&
				next.right === next.bottom &&
				next.bottom === next.left
			) {
				value = next.top;
			} else if ( next.top === next.bottom && next.right === next.left ) {
				value = next.top + ' ' + next.right;
			} else {
				value = `${ next.top } ${ next.right } ${ next.bottom } ${ next.left }`;
			}
			onChange( {
				borderWidth: value,
				borderStyle: next.style,
				borderColor: next.color,
				borderTopWidth: '',
				borderRightWidth: '',
				borderBottomWidth: '',
				borderLeftWidth: '',
			} );
		} else {
			onChange( {
				borderWidth: '',
				borderStyle: next.style,
				borderColor: next.color,
				borderTopWidth: next.top,
				borderRightWidth: next.right,
				borderBottomWidth: next.bottom,
				borderLeftWidth: next.left,
			} );
		}
	}
	function onClear() {
		setPropsValue( {
			attributes,
			setAttributes,
			selector,
			devices,
			props: {
				borderWidth: '',
				borderTopWidth: '',
				borderRightWidth: '',
				borderBottomWidth: '',
				borderLeftWidth: '',
			},
		} );
	}

	return (
		<>
			<div className="scblocks-border-control-color-style">
				<OpenColorPicker
					label={ __( 'Color', 'scblocks' ) }
					value={ color }
					onChange={ onChangeColor }
					isStacked
				/>
				<SelectControl
					label={ __( 'Style', 'scblocks' ) }
					value={ style }
					options={ [
						{ label: __( 'Default', 'scblocks' ), value: '' },
						{ label: __( 'Solid', 'scblocks' ), value: 'solid' },
						{ label: __( 'Dotted', 'scblocks' ), value: 'dotted' },
						{ label: __( 'Dashed', 'scblocks' ), value: 'dashed' },
						{ label: __( 'Double', 'scblocks' ), value: 'double' },
					] }
					onChange={ onChangeStyle }
				/>
			</div>
			<ControlWrapper
				label={ __( 'Width', 'scblocks' ) }
				isClearButton={ top || right || bottom || left }
				onClear={ onClear }
				headerControls={
					<LinkSides
						isLinked={ isLinked }
						onClick={ () => setIsLinked( ! isLinked ) }
					/>
				}
			>
				<div className="scblocks-border-control-width-top">
					<NumberUnit
						label={ __( 'Top', 'scblocks' ) }
						units={ [ 'px', 'em', 'rem', 'vh', 'vw' ] }
						value={ top }
						onChange={ ( value ) => onChangeWidth( 'top', value ) }
						withoutSelectDevices
						withoutSlider
					/>
				</div>
				<div className="scblocks-border-control-width-left-right">
					<NumberUnit
						label={ __( 'Left', 'scblocks' ) }
						units={ [ 'px', 'em', 'rem', 'vh', 'vw' ] }
						value={ left }
						onChange={ ( value ) => onChangeWidth( 'left', value ) }
						withoutSelectDevices
						withoutSlider
					/>
					<NumberUnit
						label={ __( 'Right', 'scblocks' ) }
						units={ [ 'px', 'em', 'rem', 'vh', 'vw' ] }
						value={ right }
						onChange={ ( value ) =>
							onChangeWidth( 'right', value )
						}
						withoutSelectDevices
						withoutSlider
					/>
				</div>
				<div className="scblocks-border-control-width-bottom">
					<NumberUnit
						label={ __( 'Bottom', 'scblocks' ) }
						units={ [ 'px', 'em', 'rem', 'vh', 'vw' ] }
						value={ bottom }
						onChange={ ( value ) =>
							onChangeWidth( 'bottom', value )
						}
						withoutSelectDevices
						withoutSlider
					/>
				</div>
			</ControlWrapper>
		</>
	);
}
