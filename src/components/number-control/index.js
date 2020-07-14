/**
 * WordPress dependencies
 */
import { RangeControl } from '@wordpress/components';

/**
 * Internal dependencies
 */
import SelectDevices from '../select-devices';
import { PLUGIN_NAME } from '../../constants';

export default function NumberControl( {
	label,
	min = 0,
	max = 100,
	unit,
	noSelectDevices = false,
	step = 1,
	onChange,
	value,
} ) {
	return (
		<div className={ `${ PLUGIN_NAME }-number-control` }>
			<div className={ `${ PLUGIN_NAME }-number-control-header` }>
				<div
					className={ `${ PLUGIN_NAME }-number-control-header-left` }
				>
					<span>{ label }</span>
					{ ! noSelectDevices && <SelectDevices /> }
				</div>
				<div
					className={ `${ PLUGIN_NAME }-number-control-header-right` }
				>
					{ unit && <span>{ unit }</span> }
				</div>
			</div>
			<input
				className="components-range-control__number"
				type="number"
				min={ min }
				max={ max }
				step={ step }
				value={ value }
				onChange={ ( event ) => onChange( event.target.value ) }
			/>
		</div>
	);
}
