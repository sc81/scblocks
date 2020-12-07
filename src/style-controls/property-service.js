/**
 * ScBlocks dependencies
 */
import {
	setPropValue,
	getPropValue,
	setCssMemoValue,
} from '@scblocks/css-utils';

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
