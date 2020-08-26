/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import BorderControl from '../border-control';
import {
	getPropertiesValue,
	setPropsSettingsForVariousDevices,
} from '../../utils';
import ControlWrapper from '../../components/control-wrapper';
import { ALL_DEVICES } from '../../constants';

export default function Border( props ) {
	const { attributes, devices, selector, setAttributes, isHover } = props;
	const currentDevice = isHover ? ALL_DEVICES : devices;

	const widths = getPropertiesValue( {
		attributes,
		devices: currentDevice,
		selector,
		props: [
			'borderWidth',
			'borderTopWidth',
			'borderRightWidth',
			'borderBottomWidth',
			'borderLeftWidth',
		],
	} );
	const colorStyle = getPropertiesValue( {
		attributes,
		devices: ALL_DEVICES,
		selector,
		props: [ 'borderColor', 'borderStyle' ],
	} );
	const border = { ...widths, ...colorStyle };

	function onChange( value ) {
		setPropsSettingsForVariousDevices( {
			attributes,
			setAttributes,
			selector,
			devicesProps: {
				[ ALL_DEVICES ]: {
					borderColor: value.borderColor,
					borderStyle: value.borderStyle,
				},
				[ currentDevice ]: {
					borderWidth: value.borderWidth,
					borderTopWidth: value.borderTopWidth,
					borderRightWidth: value.borderRightWidth,
					borderBottomWidth: value.borderBottomWidth,
					borderLeftWidth: value.borderLeftWidth,
				},
			},
		} );
	}
	function onClear() {
		setPropsSettingsForVariousDevices( {
			attributes,
			setAttributes,
			selector,
			devicesProps: {
				[ ALL_DEVICES ]: {
					borderColor: '',
					borderStyle: '',
				},
				[ currentDevice ]: {
					borderWidth: '',
					borderTopWidth: '',
					borderRightWidth: '',
					borderBottomWidth: '',
					borderLeftWidth: '',
				},
			},
		} );
	}

	return (
		<ControlWrapper
			label={ __( 'Border', 'scblocks' ) }
			displayClearButton={
				border.borderColor ||
				border.borderStyle ||
				border.borderWidth ||
				border.borderTopWidth ||
				border.borderRightWidth ||
				border.borderBottomWidth ||
				border.borderLeftWidth
			}
			onClear={ onClear }
		>
			<BorderControl border={ border } onChange={ onChange } />
		</ControlWrapper>
	);
}
