/**
 * WordPress dependencies
 */
import { SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import propertyService from '../property-service';

export default function FlexDirection( props ) {
	const { propValue, onChange } = propertyService( {
		...props,
		propName: 'flexDirection',
	} );

	return (
		<SelectControl
			label={ __( 'Flex direction' ) }
			value={ propValue }
			onChange={ onChange }
			options={ [
				{ label: __( 'Default' ), value: '' },
				{ label: __( 'Column' ), value: 'column' },
				{ label: __( 'Column-reverse' ), value: 'column-reverse' },
				{ label: __( 'Row' ), value: 'row' },
				{ label: __( 'Row-reverse' ), value: 'row-reverse' },
			] }
		/>
	);
}
