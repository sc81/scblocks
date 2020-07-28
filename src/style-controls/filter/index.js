/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import propertyService from '../property-service';
import DropdownComponent from '../../components/dropdown-component';
import FilterControl from '../filter-control';

const propName = 'filter';
const defaultValue = 'blur(2px)';

export default function Filter( props ) {
	const { propValue, onChange } = propertyService( {
		...props,
		propName,
	} );

	return (
		<DropdownComponent
			label={ __( 'CSS filters' ) }
			isValue={ !! propValue }
			withoutSelectDevices
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
				<FilterControl value={ propValue } onChange={ onChange } />
			}
		/>
	);
}
