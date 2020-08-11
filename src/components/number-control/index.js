/**
 * Internal dependencies
 */
import SelectDevices from '../select-devices';
import { PLUGIN_NAME } from '../../constants';
import ButtonClear from '../button-clear';

export default function NumberControl( {
	label,
	min = 0,
	max = 100,
	withoutSelectDevices = false,
	step = 1,
	onChange,
	value,
	hasSlider = true,
} ) {
	return (
		<div className={ `${ PLUGIN_NAME }-number-control` }>
			<div className={ `${ PLUGIN_NAME }-number-control-header` }>
				<span>{ label }</span>
				{ ! withoutSelectDevices && <SelectDevices /> }
				{ !! value && <ButtonClear onClear={ () => onChange( '' ) } /> }
			</div>
			<div className={ `${ PLUGIN_NAME }-number-control-content` }>
				{ hasSlider && (
					<input
						type="range"
						value={ value }
						onChange={ ( event ) => onChange( event.target.value ) }
						min={ min }
						max={ max }
						step={ step }
					/>
				) }
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
		</div>
	);
}
