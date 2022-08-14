/**
 * Internal dependencies
 */
import ControlWrapper from '../control-wrapper';

export default function NumberControl( {
	label,
	min = 0,
	max = 100,
	step = 1,
	onChange,
	value,
	isSelectDevice = true,
	isSlider = true,
	isClearButton = true,
	displayInline,
	isIndicator = true,
	widerHeader,
} ) {
	return (
		<ControlWrapper
			label={ label }
			isSelectDevice={ isSelectDevice }
			isClearButton={ isClearButton && !! value }
			onClear={ () => onChange( '' ) }
			displayInline={ displayInline }
			isIndicator={ isIndicator && !! value }
			widerHeader={ widerHeader }
		>
			<div
				className={ `scblocks-number-control-content${
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
		</ControlWrapper>
	);
}
