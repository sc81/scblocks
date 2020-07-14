/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import BoxShadowControl from '../box-shadow-control';
import DropdownComponent from '../../components/dropdown-component';
import propertyService from '../property-service';

const propName = 'boxShadow';
const defaultValue = '0px 0px 2px 0px #b1b1b1';

export default function BoxShadow( props ) {
	const { propValue, onChange } = propertyService( {
		...props,
		propName,
	} );

	return (
		<DropdownComponent
			label={ __( 'Box shadow' ) }
			isValue={ !! propValue }
			noSelectDevices
			onClear={ ( onClose ) => {
				onChange();
				onClose();
			} }
			onOpen={ () => {
				if ( ! propValue ) {
					onChange( defaultValue );
				}
			} }
			renderContent={
				<BoxShadowControl value={ propValue } onChange={ onChange } />
			}
		/>
	);
}
