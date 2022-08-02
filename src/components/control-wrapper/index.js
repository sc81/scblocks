/**
 * Internal dependencies
 */
import SelectDevices from '../select-devices';
import ButtonClear from '../button-clear';

export default function ControlWrapper( {
	label,
	children,
	isSelectDevice = true,
	displayInline = false,
	isClearButton = false,
	onClear,
	headerControls,
	noMarginBottom,
} ) {
	const displayInlineClass = displayInline ? ' display-inline' : '';
	const noMarginBottomClass = noMarginBottom ? ' no-margin-bottom' : '';
	return (
		<div
			className={ `scblocks-control-wrapper${ displayInlineClass }${ noMarginBottomClass }` }
		>
			<div className="scblocks-control-wrapper-header">
				<div className="scblocks-control-wrapper-header-left">
					<span>{ label }</span>
					{ isSelectDevice && <SelectDevices /> }
					{ isClearButton && <ButtonClear onClear={ onClear } /> }
				</div>
				{ headerControls && (
					<div className="scblocks-control-wrapper-header-right">
						{ headerControls }
					</div>
				) }
			</div>
			<div className="scblocks-control-wrapper-content">{ children }</div>
		</div>
	);
}
