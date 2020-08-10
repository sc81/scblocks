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
			label={ __( 'Flex direction', 'scblocks' ) }
			value={ propValue }
			onChange={ onChange }
			options={ [
				{ label: __( 'Default', 'scblocks' ), value: '' },
				{ label: __( 'Column', 'scblocks' ), value: 'column' },
				{
					label: __( 'Column-reverse', 'scblocks' ),
					value: 'column-reverse',
				},
				{ label: __( 'Row', 'scblocks' ), value: 'row' },
				{
					label: __( 'Row-reverse', 'scblocks' ),
					value: 'row-reverse',
				},
			] }
		/>
	);
}
