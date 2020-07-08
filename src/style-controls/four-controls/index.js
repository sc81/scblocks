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
import { getPropValue, setPropsAndSettings } from '../../utils';
import BindControlsSwitch from '../../components/bind-controls-switch';

const controlsNames = [ 'top', 'right', 'bottom', 'left' ];
const labels = {
	top: __( 'top' ),
	right: __( 'right' ),
	bottom: __( 'bottom' ),
	left: __( 'left' ),
};
const radiusLabels = {
	top: __( 'top-left' ),
	right: __( 'top-right' ),
	bottom: __( 'bottom-right' ),
	left: __( 'bottom-left' ),
};
const title = {
	margin: __( 'Margin' ),
	padding: __( 'Padding' ),
	borderRadius: __( 'Border radius' ),
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

export default function FourControls( props ) {
	const { attributes, setAttributes, selector, devices, propName } = props;
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

			setPropsAndSettings( {
				attributes,
				setAttributes,
				devices,
				selector,
				props: {
					[ propName ]: value,
					[ propLongName( propName, 'top' ) ]: '',
					[ propLongName( propName, 'right' ) ]: '',
					[ propLongName( propName, 'bottom' ) ]: '',
					[ propLongName( propName, 'left' ) ]: '',
				},
			} );
		} else {
			setPropsAndSettings( {
				attributes,
				setAttributes,
				devices,
				selector,
				props: {
					[ propName ]: '',
					[ propLongName( propName, 'top' ) ]: next.top,
					[ propLongName( propName, 'right' ) ]: next.right,
					[ propLongName( propName, 'bottom' ) ]: next.bottom,
					[ propLongName( propName, 'left' ) ]: next.left,
				},
			} );
		}
	}
	function onClear() {
		setPropsAndSettings( {
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
	function controls() {
		const min = propName === 'margin' ? -100 : 0;
		const unitRangeStep = {
			px: {
				min,
			},
			'%': {
				min,
			},
		};
		return controlsNames.map( ( pos ) => {
			const label =
				propName === 'borderRadius'
					? radiusLabels[ pos ]
					: labels[ pos ];
			let value;
			switch ( pos ) {
				case 'top':
					value = top;
					break;
				case 'right':
					value = right;
					break;
				case 'bottom':
					value = bottom;
					break;
				case 'left':
					value = left;
					break;
			}
			return (
				<NumberUnit
					key={ pos }
					label={ label }
					value={ value }
					units={ [ 'px', '%' ] }
					onChange={ ( val ) => onChange( val, pos ) }
					unitRangeStep={ unitRangeStep }
					noSelectDevices
				/>
			);
		} );
	}

	return (
		<ControlWrapper
			{ ...props }
			label={ title[ propName ] }
			isButtonClear={ short || top || right || bottom || left }
			onClear={ onClear }
		>
			<BindControlsSwitch
				value={ switcheState }
				onChange={ setSwitcheState }
			/>
			{ controls() }
		</ControlWrapper>
	);
}
