/**
 * ScBlocks dependencies
 */
import { NumberControl } from '@scblocks/components';

/**
 * Internal dependencies
 */
import propertyService from '../property-service';

export default function NumberProperty( props ) {
	const { propValue, onChange } = propertyService( props );
	return (
		<NumberControl
			label={ props.label }
			value={ propValue }
			onChange={ onChange }
			withoutSelectDevices={ props.withoutSelectDevices }
			min={ props.min }
			max={ props.max }
			step={ props.step }
		/>
	);
}
