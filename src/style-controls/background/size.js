/**
 * WordPress dependencies
 */
import { SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * ScBlocks dependencies
 */
import { getPropValue, setPropValue } from '@scblocks/css-utils';
import { NumberControl, ControlWrapper } from '@scblocks/components';

/**
 * Internal dependencies
 */
import { names } from './constants';

const propName = names.size;

const options = [
	{ label: __( 'Default', 'scblocks' ), value: '' },
	{ label: __( 'Auto', 'scblocks' ), value: 'auto' },
	{ label: __( 'Contain', 'scblocks' ), value: 'contain' },
	{ label: __( 'Cover', 'scblocks' ), value: 'cover' },
	{ label: __( 'Custom', 'scblocks' ), value: 'custom' },
];

export default function Size( {
	attributes,
	setAttributes,
	devices,
	selector,
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
		<ControlWrapper
			label={ __( 'Size', 'scblocks' ) }
			displayInline={ ! isCustom }
		>
			<SelectControl
				value={ selectValue }
				options={ options }
				onChange={ onChangeSelect }
			/>
			{ isCustom && (
				<NumberControl
					value={ size }
					onChange={ onChangeCustom }
					min={ 0 }
					max={ 200 }
					step={ 1 }
					isSelectDevice={ false }
					isClearButton={ false }
				/>
			) }
		</ControlWrapper>
	);
}
