/**
 * WordPress dependencies
 */
import { SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { PLUGIN_NAME } from '../../constants';
import propertyService from '../property-service';

const propName = 'alignItems';

export default function AlignItems( props ) {
	const { propValue, onChange } = propertyService( {
		...props,
		propName,
	} );

	return (
		<SelectControl
			className={ `${ PLUGIN_NAME }-select-control-inline` }
			label={ __( 'Vertical position' ) }
			value={ propValue }
			options={ [
				{ label: __( 'Default' ), value: '' },
				{ label: __( 'Top' ), value: 'flex-start' },
				{ label: __( 'Center' ), value: 'center' },
				{ label: __( 'Bottom' ), value: 'flex-end' },
			] }
			onChange={ onChange }
		/>
	);
}
