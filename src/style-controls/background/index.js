/**
 * WordPress dependencies
 */
import { useState } from '@wordpress/element';

/**
 * ScBlocks dependencies
 */
import {
	getPropValue,
	setPropsForVariousDevices,
	getPropsForEveryDevice,
	getMemoBackgroundImageIds,
	getCssMemoValue,
} from '@scblocks/css-utils';
import { ALL_DEVICES } from '@scblocks/constants';

/**
 * Internal dependencies
 */
import {
	names,
	IMAGE_BACKGROUND_TYPE,
	GRADIENT_BACKGROUND_TYPE,
} from './constants';
import SelectBackgroundType from './select-background-type';
import Image from './image';
import Gradient from './gradient';
import Color from '../color';
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
			const properties = getCssMemoValue(
				blockMemo,
				'dynamic',
				getPropsForEveryDevice,
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
				}
			);
			// don't set a gradient
			if ( properties[ ALL_DEVICES ] ) {
				properties[ ALL_DEVICES ][ names.image ] = '';
			}
			setPropsForVariousDevices( {
				attributes,
				setAttributes,
				selector,
				props: {
					...properties,
				},
			} );
			const ids = getMemoBackgroundImageIds( blockMemo );
			setAttributes( { backgroundImageIds: ids } );
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

			setPropsForVariousDevices( {
				attributes,
				setAttributes,
				selector,
				props: {
					[ ALL_DEVICES ]: {
						backgroundImage,
					},
				},
				everyDeviceProps: {
					[ names.image ]: '',
					[ names.size ]: '',
					[ names.repeat ]: '',
					[ names.position ]: '',
					[ names.attachment ]: '',
					[ names.opacity ]: '',
				},
			} );
			setAttributes( { backgroundImageIds: null } );
		} else {
			setPropsForVariousDevices( {
				attributes,
				setAttributes,
				selector,
				everyDeviceProps: {
					[ names.image ]: '',
					[ names.size ]: '',
					[ names.repeat ]: '',
					[ names.position ]: '',
					[ names.attachment ]: '',
					[ names.opacity ]: '',
				},
			} );
			setAttributes( { backgroundImageIds: null } );
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
