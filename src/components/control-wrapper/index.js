/**
 * WordPress dependencies
 */
import { applyFilters } from '@wordpress/hooks';
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
	isIndicator,
	widerHeader,
} ) {
	const displayInlineClass = displayInline ? ' display-inline' : '';
	const noMarginBottomClass = noMarginBottom ? ' no-margin-bottom' : '';
	const widerHeaderClass = widerHeader ? ' wider-header' : '';
	const labelClassName = applyFilters(
		'scblocks.controlWrapper.className',
		'scblocks-control-wrapper-label',
		isIndicator
	);
	return (
		<div
			className={ `scblocks-control-wrapper${ displayInlineClass }${ noMarginBottomClass }${ widerHeaderClass }` }
		>
			<div className="scblocks-control-wrapper-header">
				<div className="scblocks-control-wrapper-header-left">
					<span className={ labelClassName }>{ label }</span>
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
