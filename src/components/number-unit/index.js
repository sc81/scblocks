/**
 * External dependencies
 */
import { merge } from 'lodash';
/**
 * WordPress dependencies
 */
import { useMemo, useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import DropdownUnits from '../dropdown-units';
import ControlWrapper from '../control-wrapper';

function getDefaultUnitRangeStep() {
	return {
		px: {
			min: 0,
			max: 100,
			step: 1,
		},
		'%': {
			min: 0,
			max: 100,
			step: 0.1,
		},
		vh: {
			min: 0,
			max: 100,
			step: 0.1,
		},
		vw: {
			min: 0,
			max: 100,
			step: 0.1,
		},
		em: {
			min: 0,
			max: 10,
			step: 0.1,
		},
		rem: {
			min: 0,
			max: 10,
			step: 0.1,
		},
	};
}
function getNumber( value ) {
	if ( ! value ) {
		return '';
	}
	return parseFloat( value, 10 );
}
function isNumber( value ) {
	return ! ( ! value && 0 !== value );
}
function getUnit( value, number, units ) {
	if ( ! isNumber( number ) ) {
		return units[ 0 ];
	}
	return value.replace( number + '', '' );
}

export default function NumberUnit( {
	value,
	units,
	unitRangeStep,
	label = '',
	isSelectDevice = true,
	onChange,
	isClearButton,
	onClear,
	isSlider = true,
	displayInline,
	noMarginBottom,
} ) {
	const number = getNumber( value );
	const [ unitState, setUnit ] = useState( () =>
		getUnit( value, number, units )
	);
	const unit = number ? getUnit( value, number, units ) : unitState;

	const currentUnitRangeStep = useMemo( () => {
		return merge( getDefaultUnitRangeStep(), unitRangeStep );
	}, [ unitRangeStep ] );

	function onChangeNumber( val ) {
		let nextValue;
		if ( ! isNumber( val ) ) {
			nextValue = '';
		} else {
			nextValue = val + unit;
		}
		onChange( nextValue );
	}

	function onChangeUnit( nextUnit ) {
		setUnit( nextUnit );
		onChange();
	}

	return (
		<ControlWrapper
			label={ label }
			isSelectDevice={ isSelectDevice }
			isClearButton={ isClearButton && isNumber( number ) }
			onClear={ onClear }
			displayInline={ displayInline }
			noMarginBottom={ noMarginBottom }
			headerControls={
				<DropdownUnits
					units={ units }
					value={ unit }
					onChangeUnit={ onChangeUnit }
				/>
			}
		>
			<div
				className={ `scblocks-number-unit-content${
					! isSlider ? ' without-slider' : ''
				}` }
			>
				{ isSlider && (
					<input
						type="range"
						value={ number }
						onChange={ ( event ) =>
							onChangeNumber( event.target.value )
						}
						min={ currentUnitRangeStep[ unit ].min }
						max={ currentUnitRangeStep[ unit ].max }
						step={ currentUnitRangeStep[ unit ].step }
					/>
				) }
				<input
					className="components-range-control__number"
					type="number"
					value={ number }
					onChange={ ( event ) =>
						onChangeNumber( event.target.value )
					}
					min={ currentUnitRangeStep[ unit ].min }
					max={ currentUnitRangeStep[ unit ].max }
					step={ currentUnitRangeStep[ unit ].step }
				/>
			</div>
		</ControlWrapper>
	);
}
