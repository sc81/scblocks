/**
 * WordPress dependencies
 */
import { SelectControl, RangeControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { setPropValue, getPropValue } from '../../utils';
import { names } from './constants';
import ControlWrapper from '../../components/control-wrapper';
import { setCssMemoValue } from '../../hooks/use-block-memo';

const propName = names.size;

const options = [
	{ label: __( 'Default' ), value: '' },
	{ label: __( 'Auto' ), value: 'auto' },
	{ label: __( 'Contain' ), value: 'contain' },
	{ label: __( 'Cover' ), value: 'cover' },
	{ label: __( 'Custom' ), value: 'custom' },
];

export default function Size( {
	attributes,
	setAttributes,
	devices,
	selector,
	isHover,
	blockMemo,
} ) {
	const backgroundSize = getPropValue( {
		attributes,
		selector,
		devices,
		propName,
	} );

	let selectValue,
		size = '',
		isCustom = false;

	if ( /\d/.test( backgroundSize ) ) {
		isCustom = true;
		selectValue = 'custom';
		size = parseFloat( backgroundSize.replace( '%', '' ) );
	} else {
		selectValue = backgroundSize;
	}

	function onChange( value ) {
		setPropValue( {
			attributes,
			setAttributes,
			devices,
			selector,
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
	function onChangeCustom( value ) {
		onChange( Number( value ).toFixed( 0 ) + '%' );
	}
	function onChangeSelect( value ) {
		if ( value === 'custom' ) {
			value = '100%';
		}
		onChange( value );
	}

	return (
		<ControlWrapper label={ __( 'Size' ) } withoutSelectDevices={ isHover }>
			<SelectControl
				value={ selectValue }
				options={ options }
				onChange={ onChangeSelect }
			/>
			{ isCustom && (
				<RangeControl
					className="flex-basis-100 margin-top-10"
					value={ size }
					onChange={ onChangeCustom }
					min={ 0 }
					max={ 200 }
				/>
			) }
		</ControlWrapper>
	);
}
