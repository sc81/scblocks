/**
 * Internal dependencies
 */
import SelectDevices from '../select-devices';
import { PLUGIN_NAME } from '../../constants';
import ButtonClear from '../button-clear';

export default function ControlWrapper( {
	label,
	children,
	withoutSelectDevices = false,
	displayInline = false,
	withoutHeader = false, // what is it for ??
	displayClearButton = false,
	onClear,
	extraControls,
} ) {
	const additionalClass = displayInline ? ' display-inline' : '';
	return (
		<div
			className={ `${ PLUGIN_NAME }-control-wrapper${ additionalClass }` }
		>
			{ ! withoutHeader && (
				<div className={ `${ PLUGIN_NAME }-control-wrapper-header` }>
					<div
						className={ `${ PLUGIN_NAME }-control-wrapper-header-left` }
					>
						<span>{ label }</span>
						{ ! withoutSelectDevices && <SelectDevices /> }
						{ displayClearButton && (
							<ButtonClear onClear={ onClear } />
						) }
					</div>
					{ extraControls && (
						<div
							className={ `${ PLUGIN_NAME }-control-wrapper-header-right` }
						>
							{ extraControls }
						</div>
					) }
				</div>
			) }
			<div className={ `${ PLUGIN_NAME }-control-wrapper-content` }>
				{ children }
			</div>
		</div>
	);
}
