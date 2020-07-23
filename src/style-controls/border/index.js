/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import BorderControl from '../border-control';
import { getPropertiesValue, setPropsSettings } from '../../utils';
import ControlWrapper from '../../components/control-wrapper';

export default function Border( props ) {
	const { attributes, devices, selector, setAttributes } = props;

	const border = getPropertiesValue( {
		attributes,
		devices,
		selector,
		props: [
			'borderColor',
			'borderStyle',
			'borderWidth',
			'borderTopWidth',
			'borderRightWidth',
			'borderBottomWidth',
			'borderLeftWidth',
		],
	} );

	function onChange( value ) {
		setPropsSettings( {
			attributes,
			setAttributes,
			devices,
			selector,
			props: value,
		} );
	}
	function onClear() {
		setPropsSettings( {
			attributes,
			setAttributes,
			devices,
			selector,
			props: {
				borderColor: '',
				borderStyle: '',
				borderWidth: '',
				borderTopWidth: '',
				borderRightWidth: '',
				borderBottomWidth: '',
				borderLeftWidth: '',
			},
		} );
	}

	return (
		<ControlWrapper
			label={ __( 'Border' ) }
			noSelectDevices
			isButtonClear={
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
