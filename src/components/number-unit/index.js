/**
 * External dependencies
 */
import { merge } from 'lodash';
/**
 * WordPress dependencies
 */
import { useMemo, useState } from '@wordpress/element';

/**
 * ScBlocks dependencies
 */
import { PLUGIN_NAME } from '@scblocks/constants';

/**
 * Internal dependencies
 */
import SelectDevices from '../select-devices';
import ButtonClear from '../button-clear';
import DropdownUnits from '../dropdown-units';

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
	withoutSelectDevices = false,
	onChange,
	displayClearButton,
	onClear,
	withoutSlider,
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
		<div className={ `${ PLUGIN_NAME }-number-unit` }>
			<div className={ `${ PLUGIN_NAME }-number-unit-header` }>
				<div className={ `${ PLUGIN_NAME }-number-unit-header-left` }>
					<span>{ label }</span>
					{ ! withoutSelectDevices && <SelectDevices /> }
					{ displayClearButton && isNumber( number ) && (
						<ButtonClear onClear={ onClear } />
					) }
				</div>
				<div className={ `${ PLUGIN_NAME }-number-unit-header-right` }>
					<DropdownUnits
						units={ units }
						value={ unit }
						onChangeUnit={ onChangeUnit }
					/>
				</div>
			</div>
			<div className={ `${ PLUGIN_NAME }-number-unit-content` }>
				{ ! withoutSlider && (
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
		</div>
	);
}
