/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';

/**
 * ScBlocks dependencies
 */
import { getPropertiesValue, setPropsValue } from '@scblocks/css-utils';
import { ControlWrapper, NumberUnit, LinkSides } from '@scblocks/components';

const title = {
	margin: __( 'Margin', 'scblocks' ),
	padding: __( 'Padding', 'scblocks' ),
};

const propLongName = {
	margin: {
		top: 'marginTop',
		right: 'marginRight',
		bottom: 'marginBottom',
		left: 'marginLeft',
	},
	padding: {
		top: 'paddingTop',
		right: 'paddingRight',
		bottom: 'paddingBottom',
		left: 'paddingLeft',
	},
};
function getUnitRangeStep() {
	return {
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
		},
		rem: {
			min: -1000,
			max: 1000,
		},
		vh: {
			min: -1000,
			max: 1000,
			step: 1,
		},
		vw: {
			min: -1000,
			max: 1000,
			step: 1,
		},
	};
}
const unitRangeStep = {
	top: getUnitRangeStep(),
	right: getUnitRangeStep(),
	bottom: getUnitRangeStep(),
	left: getUnitRangeStep(),
};

export default function FourControls( props ) {
	const { attributes, setAttributes, selector, devices, propName } = props;
	const [ isLinked, setIsLinked ] = useState( false );

	const cssProps = getPropertiesValue( {
		attributes,
		devices,
		selector,
		props: [
			propName,
			propLongName[ propName ].top,
			propLongName[ propName ].right,
			propLongName[ propName ].bottom,
			propLongName[ propName ].left,
		],
	} );
	const short = cssProps[ propName ];
	let top = cssProps[ propLongName[ propName ].top ];
	let right = cssProps[ propLongName[ propName ].right ];
	let bottom = cssProps[ propLongName[ propName ].bottom ];
	let left = cssProps[ propLongName[ propName ].left ];

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
		if ( isLinked ) {
			nextState = {
				top: value,
				right: value,
				bottom: value,
				left: value,
			};
		} else {
			nextState = {
				top,
				right,
				bottom,
				left,
				[ position ]: value,
			};
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
				nextShort = `${ next.top } ${ next.right }`;
			} else {
				nextShort = `${ next.top } ${ next.right } ${ next.bottom } ${ next.left }`;
			}
		} else {
			nextTop = next.top;
			nextRight = next.right;
			nextBottom = next.bottom;
			nextLeft = next.left;
		}
		setPropsValue( {
			attributes,
			setAttributes,
			devices,
			selector,
			props: {
				[ propName ]: nextShort,
				[ propLongName[ propName ].top ]: nextTop,
				[ propLongName[ propName ].right ]: nextRight,
				[ propLongName[ propName ].bottom ]: nextBottom,
				[ propLongName[ propName ].left ]: nextLeft,
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
				[ propLongName[ propName ].top ]: '',
				[ propLongName[ propName ].right ]: '',
				[ propLongName[ propName ].bottom ]: '',
				[ propLongName[ propName ].left ]: '',
			},
		} );
	}

	return (
		<ControlWrapper
			label={ title[ propName ] }
			isClearButton={ short || top || right || bottom || left }
			isIndicator={ short || top || right || bottom || left }
			onClear={ onClear }
			headerControls={
				<LinkSides
					isLinked={ isLinked }
					onClick={ () => setIsLinked( ! isLinked ) }
				/>
			}
		>
			<div className="scblocks-four-controls-top">
				<NumberUnit
					label={ __( 'top', 'scblocks' ) }
					value={ top }
					onChange={ ( value ) => onChange( value, 'top' ) }
					units={ [ 'px', 'em', 'rem', 'vh', 'vw', '%' ] }
					isSelectDevice={ false }
					unitRangeStep={ unitRangeStep.top }
					noMarginBottom
					isSlider={ false }
					isIndicator={ false }
				/>
			</div>
			<div className="scblocks-four-controls-left-right">
				<NumberUnit
					label={ __( 'left', 'scblocks' ) }
					value={ left }
					onChange={ ( value ) => onChange( value, 'left' ) }
					units={ [ 'px', 'em', 'rem', 'vh', 'vw', '%' ] }
					isSelectDevice={ false }
					unitRangeStep={ unitRangeStep.left }
					noMarginBottom
					isSlider={ false }
					isIndicator={ false }
				/>
				<NumberUnit
					label={ __( 'right', 'scblocks' ) }
					value={ right }
					onChange={ ( value ) => onChange( value, 'right' ) }
					units={ [ 'px', 'em', 'rem', 'vh', 'vw', '%' ] }
					isSelectDevice={ false }
					unitRangeStep={ unitRangeStep.right }
					noMarginBottom
					isSlider={ false }
					isIndicator={ false }
				/>
			</div>
			<div className="scblocks-four-controls-bottom">
				<NumberUnit
					label={ __( 'bottom', 'scblocks' ) }
					value={ bottom }
					onChange={ ( value ) => onChange( value, 'bottom' ) }
					units={ [ 'px', 'em', 'rem', 'vh', 'vw', '%' ] }
					isSelectDevice={ false }
					unitRangeStep={ unitRangeStep.bottom }
					noMarginBottom
					isSlider={ false }
					isIndicator={ false }
				/>
			</div>
		</ControlWrapper>
	);
}
