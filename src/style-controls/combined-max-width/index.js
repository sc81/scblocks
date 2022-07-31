import NumberUnitProperty from '../number-unit-property';

export default function CombinedMaxWidth( props ) {
	const { selectorSettings } = props;
	const controls = selectorSettings.panels.space.controls.combinedMaxWidth;
	return controls.map( ( control, index ) => {
		return (
			<NumberUnitProperty
				{ ...props }
				key={ index }
				label={ control.label }
				selector={ control.selector }
				propName="maxWidth"
				unitRangeStep={ {
					px: {
						max: 1600,
						min: 50,
					},
				} }
			/>
		);
	} );
}
