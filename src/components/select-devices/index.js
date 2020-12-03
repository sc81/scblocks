/**
 * WordPress dependencies
 */
import { DropdownMenu } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useSelect, useDispatch } from '@wordpress/data';

/**
 * ScBlocks dependencies
 */
import { CORE_EDIT_POST_STORE_NAME } from '@scblocks/constants';

const icons = [
	{
		name: 'desktop',
		title: __( 'Desktop', 'scblocks' ),
		value: 'Desktop',
	},
	{
		name: 'tablet',
		title: __( 'Tablet', 'scblocks' ),
		value: 'Tablet',
	},
	{
		name: 'smartphone',
		title: __( 'Mobile', 'scblocks' ),
		value: 'Mobile',
	},
];

export default function SelectDevices() {
	const device = useSelect(
		( select ) =>
			select(
				CORE_EDIT_POST_STORE_NAME
			).__experimentalGetPreviewDeviceType(),
		[]
	);
	const {
		__experimentalSetPreviewDeviceType: setPreviewDeviceType,
	} = useDispatch( CORE_EDIT_POST_STORE_NAME );

	const icon = icons.find( ( e ) => device === e.value ).name;

	return (
		<DropdownMenu
			icon={ icon }
			label={ __( 'Select devices', 'scblocks' ) }
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
