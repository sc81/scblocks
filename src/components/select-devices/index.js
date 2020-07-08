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
	STORE_NAME,
	SMALL_DEVICES,
	MEDIUM_DEVICES,
	LARGE_DEVICES,
} from '../../constants';

const icons = [
	{ name: 'desktop', title: __( 'Desktop' ), value: LARGE_DEVICES },
	{ name: 'tablet', title: __( 'Tablet' ), value: MEDIUM_DEVICES },
	{ name: 'smartphone', title: __( 'Smartphone' ), value: SMALL_DEVICES },
];

export default function SelectDevices() {
	const devices = useSelect( ( select ) =>
		select( STORE_NAME ).getCurrentDevices()
	);
	const { setCurrentDevices } = useDispatch( STORE_NAME );

	const icon = icons.find( ( e ) => devices === e.value ).name;

	return (
		<DropdownMenu
			icon={ icon }
			label={ __( 'Select devices' ) }
			controls={ [
				{
					title: icons[ 0 ].title,
					icon: icons[ 0 ].name,
					onClick: () => {
						setCurrentDevices( icons[ 0 ].value );
					},
				},
				{
					title: icons[ 1 ].title,
					icon: icons[ 1 ].name,
					onClick: () => {
						setCurrentDevices( icons[ 1 ].value );
					},
				},
				{
					title: icons[ 2 ].title,
					icon: icons[ 2 ].name,
					onClick: () => {
						setCurrentDevices( icons[ 2 ].value );
					},
				},
			] }
		/>
	);
}
