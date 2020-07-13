/**
 * External dependencies
 */
import { merge } from 'lodash';
/**
 * WordPress dependencies
 */
import {
	Button,
	NavigableMenu,
	Dropdown,
	RangeControl,
} from '@wordpress/components';
import { useMemo, useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { PLUGIN_NAME } from '../../constants';
import SelectDevices from '../select-devices';
import ButtonClear from '../button-clear';

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
	noSelectDevices = false,
	onChange,
	isButtonClear,
	onClear,
	withoutSlider,
	...rest
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
					{ ! noSelectDevices && <SelectDevices /> }
					{ isButtonClear && <ButtonClear onClear={ onClear } /> }
				</div>
				<div className={ `${ PLUGIN_NAME }-number-unit-header-right` }>
					{ units.length === 1 && <span>{ units[ 0 ] }</span> }
					{ units.length > 1 && (
						<Dropdown
							className={ `components-dropdown-menu ${ PLUGIN_NAME }-dropdown-units` }
							contentClassName={ `${ PLUGIN_NAME }-dropdown-units-popover` }
							renderToggle={ ( { isOpen, onToggle } ) => (
								<Button
									isLink
									onClick={ onToggle }
									aria-expanded={ isOpen }
								>
									<span>{ unit }</span>
								</Button>
							) }
							renderContent={ ( { onClose } ) => (
								<NavigableMenu>
									{ units.map( ( u ) => {
										return (
											<Button
												key={ u }
												className={ `components-dropdown-menu__menu-item${
													u === unit
														? ' is-active'
														: ''
												}` }
												onClick={ () => {
													onClose();
													onChangeUnit( u );
												} }
											>
												{ u }
											</Button>
										);
									} ) }
								</NavigableMenu>
							) }
						/>
					) }
				</div>
			</div>
			{ withoutSlider && (
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
			) }
			{ ! withoutSlider && (
				<RangeControl
					value={ number }
					onChange={ onChangeNumber }
					min={ currentUnitRangeStep[ unit ].min }
					max={ currentUnitRangeStep[ unit ].max }
					step={ currentUnitRangeStep[ unit ].step }
					{ ...rest }
				/>
			) }
		</div>
	);
}
