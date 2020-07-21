/**
 * WordPress dependencies
 */
import { SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import propertyService from '../property-service';
import ControlWrapper from '../../components/control-wrapper';

export default function FlexDirection( props ) {
	const { propValue, onChange } = propertyService( {
		...props,
		propName: 'flexDirection',
	} );
	return (
		<ControlWrapper
			label={ props.label || __( 'Flex direction' ) }
			displayInline={ props.displayInline }
		>
			<SelectControl
				value={ propValue }
				onChange={ onChange }
				options={ [
					{ label: __( 'Default' ), value: '' },
					{ label: __( 'row' ), value: 'row' },
					{ label: __( 'row-reverse' ), value: 'row-reverse' },
					{ label: __( 'column' ), value: 'column' },
					{ label: __( 'column-reverse' ), value: 'column-reverse' },
				] }
			/>
		</ControlWrapper>
	);
}
