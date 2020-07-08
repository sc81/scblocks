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
	...rest
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
			<RangeControl min={ min } max={ max } { ...rest } />
		</div>
	);
}
