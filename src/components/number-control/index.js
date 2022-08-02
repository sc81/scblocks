/**
 * ScBlocks dependencies
 */
import { PLUGIN_NAME } from '@scblocks/constants';
/**
 * Internal dependencies
 */
import SelectDevices from '../select-devices';
import ButtonClear from '../button-clear';

export default function NumberControl( {
	label,
	min = 0,
	max = 100,
	isSelectDevice = true,
	step = 1,
	onChange,
	value,
	isSlider = true,
	isClearButton = true,
} ) {
	return (
		<div className={ `${ PLUGIN_NAME }-number-control` }>
			<div className={ `${ PLUGIN_NAME }-number-control-header` }>
				<span>{ label }</span>
				{ isSelectDevice && <SelectDevices /> }
				{ isClearButton && !! value && (
					<ButtonClear onClear={ () => onChange( '' ) } />
				) }
			</div>
			<div
				className={ `${ PLUGIN_NAME }-number-control-content${
					! isSlider ? ' without-slider' : ''
				}` }
			>
				{ isSlider && (
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
