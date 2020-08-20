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
			label={ __( 'Align-items', 'scblocks' ) }
			value={ propValue }
			options={ [
				{ label: __( 'Default', 'scblocks' ), value: '' },
				{ label: __( 'Top', 'scblocks' ), value: 'flex-start' },
				{ label: __( 'Center', 'scblocks' ), value: 'center' },
				{ label: __( 'Bottom', 'scblocks' ), value: 'flex-end' },
			] }
			onChange={ onChange }
		/>
	);
}
