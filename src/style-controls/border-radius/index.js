/**
 * WordPress dependencies
 */
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { link, linkOff } from '@wordpress/icons';

/**
 * ScBlocks dependencies
 */
import { NumberUnit, ControlWrapper } from '@scblocks/components';
import { getPropertiesValue, setPropsValue } from '@scblocks/css-utils';

export default function BorderRadius( {
	attributes,
	devices,
	selector,
	setAttributes,
} ) {
	const [ isLinked, setIsLinked ] = useState( false );
	let {
		borderRadius,
		borderTopLeftRadius: topLeft,
		borderTopRightRadius: topRight,
		borderBottomLeftRadius: bottomLeft,
		borderBottomRightRadius: bottomRight,
	} = getPropertiesValue( {
		attributes,
		devices,
		selector,
		props: [
			'borderRadius',
			'borderTopLeftRadius',
			'borderTopRightRadius',
			'borderBottomLeftRadius',
			'borderBottomRightRadius',
		],
	} );
	if ( borderRadius ) {
		const value = borderRadius.split( ' ' );
		if ( value.length === 1 ) {
			topLeft = topRight = bottomLeft = bottomRight = value[ 0 ];
		}
		if ( value.length === 2 ) {
			topLeft = bottomRight = value[ 0 ];
			topRight = bottomLeft = value[ 1 ];
		}
		if ( value.length === 4 ) {
			topLeft = value[ 0 ];
			topRight = value[ 1 ];
			bottomRight = value[ 2 ];
			bottomLeft = value[ 3 ];
		}
	}
	function onChange( position, value ) {
		let nextState;
		if ( isLinked ) {
			nextState = {
				topLeft: value,
				topRight: value,
				bottomRight: value,
				bottomLeft: value,
			};
		} else {
			nextState = {
				topLeft,
				topRight,
				bottomRight,
				bottomLeft,
				[ position ]: value,
			};
		}
		setValue( nextState );
	}
	function setValue( next ) {
		let nextProps;
		if (
			next.topLeft &&
			next.topRight &&
			next.bottomLeft &&
			next.bottomRight
		) {
			let value;
			if (
				next.topLeft === next.topRight &&
				next.topRight === next.bottomRight &&
				next.bottomRight === next.bottomLeft
			) {
				value = next.topLeft;
			} else if (
				next.topLeft === next.bottomRight &&
				next.topRight === next.bottomLeft
			) {
				value = next.topLeft + ' ' + next.topRight;
			} else {
				value = `${ next.topLeft } ${ next.topRight } ${ next.bottomRight } ${ next.bottomLeft }`;
			}
			nextProps = {
				borderRadius: value,
				borderTopLeftRadius: '',
				borderTopRightRadius: '',
				borderBottomRightRadius: '',
				borderBottomLeftRadius: '',
			};
		} else {
			nextProps = {
				borderRadius: '',
				borderTopLeftRadius: next.topLeft,
				borderTopRightRadius: next.topRight,
				borderBottomRightRadius: next.bottomRight,
				borderBottomLeftRadius: next.bottomLeft,
			};
		}
		setPropsValue( {
			attributes,
			setAttributes,
			selector,
			devices,
			props: nextProps,
		} );
	}
	function onClear() {
		setPropsValue( {
			attributes,
			setAttributes,
			selector,
			devices,
			props: {
				borderRadius: '',
				borderTopLeftRadius: '',
				borderTopRightRadius: '',
				borderBottomRightRadius: '',
				borderBottomLeftRadius: '',
			},
		} );
	}
	return (
		<ControlWrapper
			label={ __( 'Border radius', 'scblocks' ) }
			displayClearButton={
				topLeft || topRight || bottomLeft || bottomRight
			}
			onClear={ onClear }
			extraControls={
				<Button
					label={ isLinked ? 'Unlink Sides' : 'Link Sides' }
					variant={ isLinked ? 'primary' : 'secondary' }
					icon={ isLinked ? link : linkOff }
					onClick={ () => setIsLinked( ! isLinked ) }
					isSmall
				/>
			}
		>
			<div className="scblocks-border-radius-top">
				<NumberUnit
					label={ __( 'Top left', 'scblocks' ) }
					units={ [ 'px', '%' ] }
					value={ topLeft }
					onChange={ ( value ) => onChange( 'topLeft', value ) }
					withoutSelectDevices
					withoutSlider
					unitRangeStep={ {
						'%': {
							step: 1,
						},
					} }
				/>
				<NumberUnit
					label={ __( 'Top right', 'scblocks' ) }
					units={ [ 'px', '%' ] }
					value={ topRight }
					onChange={ ( value ) => onChange( 'topRight', value ) }
					withoutSelectDevices
					withoutSlider
					unitRangeStep={ {
						'%': {
							step: 1,
						},
					} }
				/>
			</div>
			<div className="scblocks-border-radius-bottom">
				<NumberUnit
					label={ __( 'Bottom left', 'scblocks' ) }
					units={ [ 'px', '%' ] }
					value={ bottomLeft }
					onChange={ ( value ) => onChange( 'bottomLeft', value ) }
					withoutSelectDevices
					withoutSlider
					unitRangeStep={ {
						'%': {
							step: 1,
						},
					} }
				/>
				<NumberUnit
					label={ __( 'Bottom right', 'scblocks' ) }
					units={ [ 'px', '%' ] }
					value={ bottomRight }
					onChange={ ( value ) => onChange( 'bottomRight', value ) }
					withoutSelectDevices
					withoutSlider
					unitRangeStep={ {
						'%': {
							step: 1,
						},
					} }
				/>
			</div>
		</ControlWrapper>
	);
}
