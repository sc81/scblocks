import { getPropValue, setPropValue } from '../utils';
import { setCssMemoValue } from '../hooks/use-block-memo';

export default function propertyService( props, needMemo ) {
	const propValue = getPropValue( props );

	function onChange( value ) {
		if ( typeof value === 'number' ) {
			value = value + '';
		}
		if ( needMemo ) {
			setCssMemoValue( props.blockMemo, setPropValue, {
				...props,
				value,
			} );
		}
		setPropValue( {
			...props,
			value,
		} );
	}
	return {
		propValue,
		onChange,
	};
}
