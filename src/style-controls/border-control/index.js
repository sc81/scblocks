/**
 * WordPress dependencies
 */
import { SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';

/**
 * ScBlocks dependencies
 */
import { PLUGIN_NAME } from '@scblocks/constants';
import {
	OpenColorPicker,
	NumberUnit,
	SyncControls,
} from '@scblocks/components';

const labels = {
	top: __( 'Top', 'scblocks' ),
	right: __( 'Right', 'scblocks' ),
	bottom: __( 'Bottom', 'scblocks' ),
	left: __( 'Left', 'scblocks' ),
};

export default function BorderControl( { border, onChange } ) {
	const [ switchState, setSwitchState ] = useState( 'one' );

	let {
		borderTopWidth: top,
		borderRightWidth: right,
		borderBottomWidth: bottom,
		borderLeftWidth: left,
	} = border;
	const { borderColor: color, borderStyle: style, borderWidth } = border;

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

	function onChangeWidth( position, value ) {
		let nextState;
		switch ( switchState ) {
			case 'one':
				nextState = {
					style,
					color,
					top,
					right,
					bottom,
					left,
					[ position ]: value,
				};
				break;
			case 'all':
				nextState = {
					style,
					color,
					top: value,
					right: value,
					bottom: value,
					left: value,
				};
				break;
			case 'opposite': {
				if ( position === 'top' || position === 'bottom' ) {
					nextState = {
						style,
						color,
						right,
						left,
						top: value,
						bottom: value,
					};
				} else {
					nextState = {
						style,
						color,
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
	function controls() {
		return [ 'top', 'right', 'bottom', 'left' ].map( ( pos ) => {
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
					label={ labels[ pos ] }
					units={ [ 'px' ] }
					value={ value }
					onChange={ ( val ) => onChangeWidth( pos, val ) }
					withoutSelectDevices
				/>
			);
		} );
	}

	return (
		<>
			<SelectControl
				className={ `${ PLUGIN_NAME }-select-control-inline` }
				label={ __( 'Border style', 'scblocks' ) }
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
			<OpenColorPicker
				label={ __( 'Border color', 'scblocks' ) }
				value={ color }
				onChange={ onChangeColor }
			/>
			<div>{ __( 'Border width', 'scblocks' ) }</div>
			<SyncControls value={ switchState } onChange={ setSwitchState } />
			{ controls() }
		</>
	);
}
