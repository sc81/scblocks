/**
 * WordPress dependencies
 */
import { SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { PLUGIN_NAME, ALL_DEVICES } from '../../constants';
import {
	setPropsSettingsForVariousDevices,
	getPropValue,
	setPropValue,
} from '../../utils';

import { HorizontalControls } from './horizontal-controls';
import { VerticalControls } from './vertical-controls';

const propName = 'position';

export default function Position( props ) {
	const { attributes, setAttributes, selector } = props;
	const position = getPropValue( {
		attributes,
		devices: ALL_DEVICES,
		selector,
		propName,
	} );

	const [ isCustom, setIsCustom ] = useState( !! position );

	function onChangeSelect( value ) {
		if ( value ) {
			setIsCustom( true );
			setPropValue( {
				attributes,
				setAttributes,
				devices: ALL_DEVICES,
				selector,
				propName,
				value,
			} );
		} else {
			setIsCustom( false );
			setPropsSettingsForVariousDevices( {
				attributes,
				setAttributes,
				selector,
				devicesProps: {
					[ ALL_DEVICES ]: {
						position: '',
					},
				},
				allDevicesProps: {
					right: '',
					left: '',
					top: '',
					bottom: '',
				},
			} );
		}
	}

	return (
		<>
			<SelectControl
				className={ `${ PLUGIN_NAME }-select-control` }
				label={ __( 'Position', 'scblocks' ) }
				value={ position }
				options={ [
					{ label: __( 'Default', 'scblocks' ), value: '' },
					{ label: __( 'Absolute', 'scblocks' ), value: 'absolute' },
					{ label: __( 'Fixed', 'scblocks' ), value: 'fixed' },
				] }
				onChange={ onChangeSelect }
			/>
			{ isCustom && <HorizontalControls { ...props } /> }
			{ isCustom && <VerticalControls { ...props } /> }
		</>
	);
}
