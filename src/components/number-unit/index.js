/**
 * External dependencies
 */
import { merge } from 'lodash';
/**
 * WordPress dependencies
 */
import { useMemo } from '@wordpress/element';

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
	return parseFloat( value, 10 ) + '' || '';
}
function isNumber( value ) {
	return ! ( ! value && 0 !== value );
}
function getUnit( value, number, units ) {
	if ( ! isNumber( number ) && value !== 'auto' ) {
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
	isIndicator = true,
} ) {
	const number = getNumber( value );
	const unit = getUnit( value, number, units );

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
		let nextValue;

		switch ( nextUnit ) {
			case 'auto':
				nextValue = 'auto';
				break;

			case 'px':
				nextValue = '5px';
				break;
			default:
				nextValue = '1' + nextUnit;
				break;
		}
		onChange( nextValue );
	}
	const isAutoValue = unit === 'auto';

	return (
		<ControlWrapper
			label={ label }
			isSelectDevice={ isSelectDevice }
			isClearButton={ isClearButton && isNumber( number ) }
			onClear={ onClear }
			displayInline={ displayInline }
			noMarginBottom={ noMarginBottom }
			isIndicator={ isIndicator && isNumber( number ) }
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
					! isSlider ? ' no-slider' : ''
				}` }
			>
				{ isSlider && ! isAutoValue && (
					<input
						className="scblocks-number-unit-range"
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
				{ ! isAutoValue && (
					<input
						className="scblocks-number-unit-number"
						type="number"
						value={ number }
						onChange={ ( event ) =>
							onChangeNumber( event.target.value )
						}
						min={ currentUnitRangeStep[ unit ].min }
						max={ currentUnitRangeStep[ unit ].max }
						step={ currentUnitRangeStep[ unit ].step }
					/>
				) }
				{ isAutoValue && (
					<input
						className="scblocks-number-unit-number"
						type="text"
						value="auto"
						disabled
					/>
				) }
			</div>
		</ControlWrapper>
	);
}
