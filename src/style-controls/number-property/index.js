import propertyService from '../property-service';
import NumberControl from '../../components/number-control';

export default function NumberProperty( props ) {
	const { propValue, onChange } = propertyService( props );
	return (
		<NumberControl
			label={ props.label }
			value={ propValue }
			onChange={ onChange }
			withoutSelectDevices
			min={ props.min }
			max={ props.max }
			step={ props.step }
		/>
	);
}
