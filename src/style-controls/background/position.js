/**
 * WordPress dependencies
 */
import { FocalPointPicker, SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { setPropValue, getPropValue } from '../../utils';
import { names } from './constants';
import ControlWrapper from '../../components/control-wrapper';
import { setCssMemoValue } from '../../hooks/use-block-memo';

function retriveFocalPoint( value ) {
	const focalPoint = {
		x: 0.5,
		y: 0.5,
	};
	if ( ! value ) {
		return focalPoint;
	}
	value = value.replace( /%/g, '' );
	value = value.split( ' ' );
	focalPoint.x = parseInt( value[ 0 ], 10 ) / 100;
	focalPoint.y = parseInt( value[ 1 ], 10 ) / 100;

	return focalPoint;
}

const options = [
	{ label: __( 'Default' ), value: '' },
	{ label: __( 'Custom' ), value: 'custom' },
	{ label: __( 'Center' ), value: 'center' },
	{ label: __( 'Top' ), value: 'top' },
	{ label: __( 'Right' ), value: 'right' },
	{ label: __( 'Bottom' ), value: 'bottom' },
	{ label: __( 'Left' ), value: 'left' },
	{ label: __( 'Top left' ), value: 'top left' },
	{ label: __( 'Top right' ), value: 'top right' },
	{ label: __( 'Bottom right' ), value: 'bottom right' },
	{ label: __( 'Bottom left' ), value: 'bottom left' },
];

const controlLabel = __( 'Position' );

const propName = names.position;

export default function Position( {
	attributes,
	setAttributes,
	devices,
	selector,
	url,
	isHover,
	blockMemo,
} ) {
	const position = getPropValue( {
		attributes,
		devices,
		selector,
		propName,
	} );

	let selectValue,
		focalPoint,
		isCustom = false;

	if ( /\d/.test( position ) ) {
		isCustom = true;
		focalPoint = retriveFocalPoint( position );
		selectValue = 'custom';
	} else {
		selectValue = position;
	}

	function onChange( pos ) {
		let value;
		if ( pos.x === 0 && pos.y === 0 ) {
			value = '';
		} else {
			value = `${ Number( pos.x * 100 ).toFixed( 2 ) }% ${ Number(
				pos.y * 100
			).toFixed( 2 ) }%`;
		}
		setPropValue( {
			selector,
			devices,
			attributes,
			setAttributes,
			propName,
			value,
		} );
		setCssMemoValue( blockMemo, setPropValue, {
			devices,
			selector,
			propName,
			value,
		} );
	}
	function onChangeSelect( value ) {
		let nextValue;
		if ( value === 'custom' ) {
			nextValue = '50% 50%';
		} else {
			nextValue = value;
		}
		setPropValue( {
			selector,
			devices,
			attributes,
			setAttributes,
			propName,
			value: nextValue,
		} );
		setCssMemoValue( blockMemo, setPropValue, {
			devices,
			selector,
			propName,
			value: nextValue,
		} );
	}

	return (
		<>
			<ControlWrapper
				label={ controlLabel }
				noSelectDevices={ isHover }
				displayInline
			>
				<SelectControl
					label={ controlLabel }
					hideLabelFromVision
					value={ selectValue }
					options={ options }
					onChange={ onChangeSelect }
				/>
			</ControlWrapper>
			{ isCustom && (
				<FocalPointPicker
					url={ url }
					dimensions={ {
						width: 400,
						height: 100,
					} }
					value={ focalPoint }
					onChange={ onChange }
				/>
			) }
		</>
	);
}
