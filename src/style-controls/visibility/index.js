/**
 * WordPress dependencies
 */
import { ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import ControlWrapper from '../../components/control-wrapper';
import propertyService from '../property-service';

const propName = 'display';

export default function Visibility( props ) {
	const { propValue, onChange } = propertyService( {
		...props,
		propName,
	} );

	function onChangeToggle( value ) {
		let next = '';
		if ( value ) {
			next = 'none';
		}
		onChange( next );
	}

	return (
		<ControlWrapper label={ __( 'Hide element' ) }>
			<ToggleControl
				help={ propValue ? __( 'Hidden' ) : __( 'Visible' ) }
				checked={ !! propValue }
				onChange={ onChangeToggle }
			/>
		</ControlWrapper>
	);
}
