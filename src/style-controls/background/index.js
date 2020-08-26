/**
 * WordPress dependencies
 */
import { useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import {
	setPropsSettingsForVariousDevices,
	getPropValue,
	getSelectorPropsSettingsForAllDevices,
} from '../../utils';
import {
	names,
	IMAGE_BACKGROUND_TYPE,
	GRADIENT_BACKGROUND_TYPE,
} from './constants';

import { ALL_DEVICES } from '../../constants';

import SelectBackgroundType from './select-background-type';
import Image from './image';
import Gradient from './gradient';
import Color from '../color';
import { getCssMemoValue } from '../../hooks/use-block-memo';
import retriveUrl from './utils';

export default function Normal( props ) {
	const { attributes, setAttributes, selector, devices, blockMemo } = props;
	const [ bgType, setBgType ] = useState( () => {
		const backgroundImage = getPropValue( {
			attributes,
			devices,
			selector,
			propName: names.image,
		} );
		if ( retriveUrl( backgroundImage ) ) {
			return IMAGE_BACKGROUND_TYPE;
		}

		const gradient = getPropValue( {
			attributes,
			devices: ALL_DEVICES,
			selector,
			propName: names.image,
		} );
		if ( gradient ) {
			return GRADIENT_BACKGROUND_TYPE;
		}
		return '';
	} );

	function onChangeBgType( value ) {
		setBgType( value );

		if ( value === IMAGE_BACKGROUND_TYPE ) {
			const { properties, settings } = getCssMemoValue(
				blockMemo,
				'dynamic',
				getSelectorPropsSettingsForAllDevices,
				{
					selector,
					props: [
						names.image,
						names.size,
						names.repeat,
						names.position,
						names.attachment,
						names.opacity,
					],
					settings: [ names.image ],
				}
			);
			// don't set a gradient
			if ( properties[ ALL_DEVICES ] ) {
				properties[ ALL_DEVICES ][ names.image ] = '';
			}
			setPropsSettingsForVariousDevices( {
				attributes,
				setAttributes,
				selector,
				devicesProps: {
					...properties,
				},
				devicesSettings: {
					...settings,
				},
			} );
		} else if ( value === GRADIENT_BACKGROUND_TYPE ) {
			const backgroundImage = getCssMemoValue(
				blockMemo,
				'dynamic',
				getPropValue,
				{
					selector,
					devices: ALL_DEVICES,
					propName: names.image,
				}
			);

			setPropsSettingsForVariousDevices( {
				attributes,
				setAttributes,
				selector,
				devicesProps: {
					[ ALL_DEVICES ]: {
						backgroundImage,
					},
				},
				allDevicesProps: {
					[ names.image ]: '',
					[ names.size ]: '',
					[ names.repeat ]: '',
					[ names.position ]: '',
					[ names.attachment ]: '',
					[ names.opacity ]: '',
				},
			} );
		} else {
			setPropsSettingsForVariousDevices( {
				attributes,
				setAttributes,
				selector,
				allDevicesProps: {
					[ names.image ]: '',
					[ names.size ]: '',
					[ names.repeat ]: '',
					[ names.position ]: '',
					[ names.attachment ]: '',
					[ names.opacity ]: '',
				},
				allDevicesSettings: {
					[ names.image ]: null,
				},
			} );
		}
	}
	return (
		<>
			<SelectBackgroundType
				backgroundType={ bgType }
				onChange={ onChangeBgType }
			/>
			<Color
				{ ...props }
				devices={ ALL_DEVICES }
				propName={ names.color }
			/>
			{ IMAGE_BACKGROUND_TYPE === bgType && <Image { ...props } /> }
			{ GRADIENT_BACKGROUND_TYPE === bgType && (
				<Gradient { ...props } devices={ ALL_DEVICES } />
			) }
		</>
	);
}
