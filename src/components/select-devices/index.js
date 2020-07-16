/**
 * WordPress dependencies
 */
import { DropdownMenu } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useSelect, useDispatch } from '@wordpress/data';

/**
 * Internal dependencies
 */
import {
	MOBILE_DEVICES,
	TABLET_DEVICES,
	DESKTOP_DEVICES,
	CORE_EDIT_POST_STORE_NAME,
} from '../../constants';

const icons = [
	{ name: 'desktop', title: __( 'Desktop' ), value: DESKTOP_DEVICES },
	{ name: 'tablet', title: __( 'Tablet' ), value: TABLET_DEVICES },
	{ name: 'smartphone', title: __( 'Mobile' ), value: MOBILE_DEVICES },
];

export default function SelectDevices() {
	const devices = useSelect(
		( select ) =>
			select(
				CORE_EDIT_POST_STORE_NAME
			).__experimentalGetPreviewDeviceType(),
		[]
	);
	const {
		__experimentalSetPreviewDeviceType: setPreviewDeviceType,
	} = useDispatch( CORE_EDIT_POST_STORE_NAME );

	const icon = icons.find( ( e ) => devices === e.value ).name;

	return (
		<DropdownMenu
			icon={ icon }
			label={ __( 'Select devices' ) }
			controls={ icons.map( ( element ) => ( {
				title: element.title,
				icon: element.name,
				onClick: () => {
					setPreviewDeviceType( element.value );
				},
			} ) ) }
		/>
	);
}
