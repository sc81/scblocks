/**
 * Internal dependencies
 */
import SelectDevices from '../select-devices';
import { PLUGIN_NAME } from '../../constants';
import ButtonClear from '../button-clear';

export default function ControlWrapper( {
	label,
	children,
	noSelectDevices = false,
	displayInline = false,
	noHeader = false,
	isButtonClear = false,
	onClear,
} ) {
	const additionalClass = displayInline ? ' display-inline' : '';
	return (
		<div
			className={ `${ PLUGIN_NAME }-control-wrapper${ additionalClass }` }
		>
			{ ! noHeader && (
				<div className={ `${ PLUGIN_NAME }-control-wrapper-header` }>
					<span>{ label }</span>
					{ ! noSelectDevices && <SelectDevices /> }
					{ isButtonClear && <ButtonClear onClear={ onClear } /> }
				</div>
			) }
			<div className={ `${ PLUGIN_NAME }-control-wrapper-content` }>
				{ children }
			</div>
		</div>
	);
}
