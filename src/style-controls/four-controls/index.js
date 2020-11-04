/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import ControlWrapper from '../../components/control-wrapper';
import NumberControl from '../../components/number-control';
import { getPropValue, setPropsValue } from '../../utils';
import SyncControls from '../../components/sync-controls';
import DropdownUnits from '../../components/dropdown-units';
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

const MIN_MAX_STEP = {
	margin: {
		px: {
			min: -9999,
			max: 9999,
			step: 1,
		},
		'%': {
			min: -1000,
			max: 1000,
			step: 1,
		},
		em: {
			min: -1000,
			max: 1000,
			step: 0.1,
		},
	},
	padding: {
		px: {
			min: 0,
			max: 1000,
			step: 1,
		},
		'%': {
			min: 0,
			max: 100,
			step: 1,
		},
		em: {
			min: 0,
			max: 100,
			step: 0.1,
		},
	},
	borderRadius: {
		px: {
			min: 0,
			max: 1000,
			step: 1,
		},
		'%': {
			min: 0,
			max: 100,
			step: 1,
		},
	},
};

function getMinMaxStep( propName, unit ) {
	return MIN_MAX_STEP[ propName ][ unit ];
}

const UNITS = {
	margin: [ 'px', 'em', '%' ],
	padding: [ 'px', 'em', '%' ],
	borderRadius: [ 'px', '%' ],
};

function getNumber( value ) {
	if ( ! value ) {
		return '';
	}
	return parseFloat( value, 10 );
}

function isNumber( value ) {
	return ! ( ! value && 0 !== value );
}

function getUnit( value, number ) {
	if ( ! isNumber( number ) ) {
		return 'px';
	}
	return value.replace( number + '', '' );
}

export default function FourControls( props ) {
	const { attributes, setAttributes, selector, devices, propName } = props;
	const [ syncControls, setSyncControls ] = useState( 'one' );

	const short = getPropValue( { attributes, devices, selector, propName } );

	let top, right, bottom, left;
	const incomingTop = getPropValue( {
		attributes,
		devices,
		selector,
		propName: propLongName( propName, 'top' ),
	} );
	const incomingRight = getPropValue( {
		attributes,
		devices,
		selector,
		propName: propLongName( propName, 'right' ),
	} );
	const incomingBottom = getPropValue( {
		attributes,
		devices,
		selector,
		propName: propLongName( propName, 'bottom' ),
	} );
	const incomingLeft = getPropValue( {
		attributes,
		devices,
		selector,
		propName: propLongName( propName, 'left' ),
	} );
	if ( short ) {
		const value = short.split( ' ' );
		if ( value.length === 1 ) {
			top = right = bottom = left = getNumber( value[ 0 ] );
		}
		if ( value.length === 2 ) {
			top = bottom = getNumber( value[ 0 ] );
			right = left = getNumber( value[ 1 ] );
		}
		if ( value.length === 4 ) {
			top = getNumber( value[ 0 ] );
			right = getNumber( value[ 1 ] );
			bottom = getNumber( value[ 2 ] );
			left = getNumber( value[ 3 ] );
		}
	} else {
		top = getNumber( incomingTop );
		right = getNumber( incomingRight );
		bottom = getNumber( incomingBottom );
		left = getNumber( incomingLeft );
	}
	const [ unit, setUnit ] = useState( () => {
		if ( short ) {
			const value = short.split( ' ' );
			return getUnit( value[ 0 ], top );
		}
		if ( top ) {
			return getUnit( incomingTop, top );
		}
		if ( right ) {
			return getUnit( incomingRight, right );
		}
		if ( bottom ) {
			return getUnit( incomingBottom, bottom );
		}
		if ( left ) {
			return getUnit( incomingLeft, left );
		}
		return 'px';
	} );

	function onChange( value, position ) {
		if ( ! isNumber( value ) ) {
			value = '';
		} else {
			value = value + '';
		}
		let nextState;
		switch ( syncControls ) {
			case 'one':
				nextState = {
					top: top + '',
					right: right + '',
					bottom: bottom + '',
					left: left + '',
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
						right: right + '',
						left: left + '',
						top: value,
						bottom: value,
					};
				} else {
					nextState = {
						top: top + '',
						bottom: bottom + '',
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
				nextShort = `${ next.top }${ unit }`;
			} else if ( next.top === next.bottom && next.right === next.left ) {
				nextShort = `${ next.top }${ unit } ${ next.right }${ unit }`;
			} else {
				nextShort = `${ next.top }${ unit } ${ next.right }${ unit } ${ next.bottom }${ unit } ${ next.left }${ unit }`;
			}
		} else {
			nextTop = next.top ? `${ next.top }${ unit }` : '';
			nextRight = next.right ? `${ next.right }${ unit }` : '';
			nextBottom = next.bottom ? `${ next.bottom }${ unit }` : '';
			nextLeft = next.left ? `${ next.left }${ unit }` : '';
		}
		setPropsValue( {
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
		setPropsValue( {
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
	function onChangeUnit( value ) {
		setUnit( value );
		onClear();
	}

	return (
		<ControlWrapper
			{ ...props }
			label={ title[ propName ] }
			displayClearButton={
				short ||
				incomingTop ||
				incomingRight ||
				incomingBottom ||
				incomingLeft
			}
			onClear={ onClear }
			extraControls={
				<DropdownUnits
					units={ UNITS[ propName ] }
					value={ unit }
					onChangeUnit={ onChangeUnit }
				/>
			}
		>
			<SyncControls value={ syncControls } onChange={ setSyncControls } />
			<div className={ `${ PLUGIN_NAME }-four-controls-top` }>
				<NumberControl
					label={ getLabel( 'top', propName ) }
					value={ top }
					onChange={ ( value ) => onChange( value, 'top' ) }
					withoutSelectDevices
					clearButton={ false }
					hasSlider={ false }
					{ ...getMinMaxStep( propName, unit ) }
				/>
			</div>
			<div className={ `${ PLUGIN_NAME }-four-controls-left-right` }>
				<NumberControl
					label={ getLabel( 'left', propName ) }
					value={ left }
					onChange={ ( value ) => onChange( value, 'left' ) }
					withoutSelectDevices
					clearButton={ false }
					hasSlider={ false }
					{ ...getMinMaxStep( propName, unit ) }
				/>
				<NumberControl
					label={ getLabel( 'right', propName ) }
					value={ right }
					onChange={ ( value ) => onChange( value, 'right' ) }
					withoutSelectDevices
					clearButton={ false }
					hasSlider={ false }
					{ ...getMinMaxStep( propName, unit ) }
				/>
			</div>
			<div className={ `${ PLUGIN_NAME }-four-controls-bottom` }>
				<NumberControl
					label={ getLabel( 'bottom', propName ) }
					value={ bottom }
					onChange={ ( value ) => onChange( value, 'bottom' ) }
					withoutSelectDevices
					clearButton={ false }
					hasSlider={ false }
					{ ...getMinMaxStep( propName, unit ) }
				/>
			</div>
		</ControlWrapper>
	);
}
