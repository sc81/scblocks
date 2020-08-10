/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import ControlWrapper from '../../components/control-wrapper';
import NumberUnit from '../../components/number-unit';
import { getPropValue, setPropsSettings } from '../../utils';
import BindControlsSwitch from '../../components/bind-controls-switch';
import { PLUGIN_NAME } from '../../constants';

const labels = {
	top: __( 'top', 'scblocks' ),
	right: __( 'right', 'scblocks' ),
	bottom: __( 'bottom', 'scblocks' ),
	left: __( 'left', 'scblocks' ),
};
const radiusLabels = {
	top: __( 'top-left', 'scblocks' ),
	right: __( 'top-right', 'scblocks' ),
	bottom: __( 'bottom-right', 'scblocks' ),
	left: __( 'bottom-left', 'scblocks' ),
};
const title = {
	margin: __( 'Margin', 'scblocks' ),
	padding: __( 'Padding', 'scblocks' ),
	borderRadius: __( 'Border radius', 'scblocks' ),
};
function propLongName( propName, position ) {
	if ( propName === 'borderRadius' ) {
		switch ( position ) {
			case 'top': {
				return 'borderTopLeftRadius';
			}
			case 'right': {
				return 'borderTopRightRadius';
			}
			case 'bottom': {
				return 'borderBottomRightRadius';
			}
			case 'left': {
				return 'borderBottomLeftRadius';
			}
		}
	} else {
		return (
			propName + position.replace( /^[a-z]/, ( e ) => e.toUpperCase() )
		);
	}
}
function getLabel( position, propName ) {
	return propName === 'borderRadius'
		? radiusLabels[ position ]
		: labels[ position ];
}
function getUnitRangeStep( propName, min, max ) {
	if ( min === undefined ) {
		min = propName === 'margin' ? -100 : 0;
	}
	if ( max === undefined ) {
		max = 1000;
	}
	return {
		px: {
			min,
			max,
		},
		'%': {
			min,
			max,
		},
	};
}

export default function FourControls( props ) {
	const {
		attributes,
		setAttributes,
		selector,
		devices,
		propName,
		min,
		max,
	} = props;
	const [ switcheState, setSwitcheState ] = useState( 'one' );

	const short = getPropValue( { attributes, devices, selector, propName } );
	let top = getPropValue( {
		attributes,
		devices,
		selector,
		propName: propLongName( propName, 'top' ),
	} );
	let right = getPropValue( {
		attributes,
		devices,
		selector,
		propName: propLongName( propName, 'right' ),
	} );
	let bottom = getPropValue( {
		attributes,
		devices,
		selector,
		propName: propLongName( propName, 'bottom' ),
	} );
	let left = getPropValue( {
		attributes,
		devices,
		selector,
		propName: propLongName( propName, 'left' ),
	} );

	if ( short ) {
		const value = short.split( ' ' );
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

	function onChange( value, position ) {
		let nextState;
		switch ( switcheState ) {
			case 'one':
				nextState = {
					top,
					right,
					bottom,
					left,
					[ position ]: value,
				};
				break;
			case 'all':
				nextState = {
					top: value,
					right: value,
					bottom: value,
					left: value,
				};
				break;
			case 'opposite': {
				if ( position === 'top' || position === 'bottom' ) {
					nextState = {
						right,
						left,
						top: value,
						bottom: value,
					};
				} else {
					nextState = {
						top,
						bottom,
						left: value,
						right: value,
					};
				}
				break;
			}
		}
		setValue( nextState );
	}

	function setValue( next ) {
		let nextShort = '',
			nextTop = '',
			nextRight = '',
			nextBottom = '',
			nextLeft = '';
		if ( next.top && next.right && next.bottom && next.left ) {
			if (
				next.top === next.right &&
				next.right === next.bottom &&
				next.bottom === next.left
			) {
				nextShort = next.top;
			} else if ( next.top === next.bottom && next.right === next.left ) {
				nextShort = next.top + ' ' + next.right;
			} else {
				nextShort = `${ next.top } ${ next.right } ${ next.bottom } ${ next.left }`;
			}
		} else {
			nextTop = next.top;
			nextRight = next.right;
			nextBottom = next.bottom;
			nextLeft = next.left;
		}
		setPropsSettings( {
			attributes,
			setAttributes,
			devices,
			selector,
			props: {
				[ propName ]: nextShort,
				[ propLongName( propName, 'top' ) ]: nextTop,
				[ propLongName( propName, 'right' ) ]: nextRight,
				[ propLongName( propName, 'bottom' ) ]: nextBottom,
				[ propLongName( propName, 'left' ) ]: nextLeft,
			},
		} );
	}
	function onClear() {
		setPropsSettings( {
			attributes,
			setAttributes,
			devices,
			selector,
			props: {
				[ propName ]: '',
				[ propLongName( propName, 'top' ) ]: '',
				[ propLongName( propName, 'right' ) ]: '',
				[ propLongName( propName, 'bottom' ) ]: '',
				[ propLongName( propName, 'left' ) ]: '',
			},
		} );
	}

	return (
		<ControlWrapper
			{ ...props }
			label={ title[ propName ] }
			displayClearButton={ short || top || right || bottom || left }
			onClear={ onClear }
		>
			<BindControlsSwitch
				value={ switcheState }
				onChange={ setSwitcheState }
			/>
			<div className={ `${ PLUGIN_NAME }-four-controls-top` }>
				<NumberUnit
					label={ getLabel( 'top', propName ) }
					value={ top }
					units={ [ 'px', '%' ] }
					onChange={ ( value ) => onChange( value, 'top' ) }
					unitRangeStep={ getUnitRangeStep( propName, min, max ) }
					withoutSelectDevices
					withoutSlider
				/>
			</div>
			<div className={ `${ PLUGIN_NAME }-four-controls-left-right` }>
				<NumberUnit
					label={ getLabel( 'left', propName ) }
					value={ left }
					units={ [ 'px', '%' ] }
					onChange={ ( value ) => onChange( value, 'left' ) }
					unitRangeStep={ getUnitRangeStep( propName, min, max ) }
					withoutSelectDevices
					withoutSlider
				/>
				<NumberUnit
					label={ getLabel( 'right', propName ) }
					value={ right }
					units={ [ 'px', '%' ] }
					onChange={ ( value ) => onChange( value, 'right' ) }
					unitRangeStep={ getUnitRangeStep( propName, min, max ) }
					withoutSelectDevices
					withoutSlider
				/>
			</div>
			<div className={ `${ PLUGIN_NAME }-four-controls-bottom` }>
				<NumberUnit
					label={ getLabel( 'bottom', propName ) }
					value={ bottom }
					units={ [ 'px', '%' ] }
					onChange={ ( value ) => onChange( value, 'bottom' ) }
					unitRangeStep={ getUnitRangeStep( propName, min, max ) }
					withoutSelectDevices
					withoutSlider
				/>
			</div>
		</ControlWrapper>
	);
}
