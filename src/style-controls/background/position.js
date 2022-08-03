/**
 * WordPress dependencies
 */
import { FocalPointPicker, SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * ScBlocks dependencies
 */
import { getPropValue, setPropValue } from '@scblocks/css-utils';
import { ControlWrapper } from '@scblocks/components';

/**
 * Internal dependencies
 */
import { names } from './constants';

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
	{ label: __( 'Default', 'scblocks' ), value: '' },
	{ label: __( 'Custom', 'scblocks' ), value: 'custom' },
	{ label: __( 'Center', 'scblocks' ), value: 'center' },
	{ label: __( 'Top', 'scblocks' ), value: 'top' },
	{ label: __( 'Right', 'scblocks' ), value: 'right' },
	{ label: __( 'Bottom', 'scblocks' ), value: 'bottom' },
	{ label: __( 'Left', 'scblocks' ), value: 'left' },
	{ label: __( 'Top left', 'scblocks' ), value: 'top left' },
	{ label: __( 'Top right', 'scblocks' ), value: 'top right' },
	{ label: __( 'Bottom right', 'scblocks' ), value: 'bottom right' },
	{ label: __( 'Bottom left', 'scblocks' ), value: 'bottom left' },
];

const controlLabel = __( 'Position', 'scblocks' );

const propName = names.position;

export default function Position( {
	attributes,
	setAttributes,
	devices,
	selector,
	url,
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
	}

	return (
		<>
			<ControlWrapper
				label={ controlLabel }
				displayInline
				isIndicator={ !! position }
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
