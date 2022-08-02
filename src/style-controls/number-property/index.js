/**
 * ScBlocks dependencies
 */
import { NumberControl, propertyService } from '@scblocks/components';

export default function NumberProperty( props ) {
	const { propValue, onChange } = propertyService( props );
	return (
		<NumberControl
			label={ props.label }
			value={ propValue }
			onChange={ onChange }
			isSelectDevice={ props.isSelectDevice }
			min={ props.min }
			max={ props.max }
			step={ props.step }
		/>
	);
}
