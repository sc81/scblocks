/**
 * WordPress dependencies
 */
import { useState, useCallback } from '@wordpress/element';

/**
 * Internal dependencies
 */
import {
	setPropsSettingsForVariousMedia,
	getSelectorSetting,
	getPropValue,
	getSelectorPropsSettingsForAllDevices,
} from '../../utils';
import {
	names,
	IMAGE_BACKGROUND_TYPE,
	GRADIENT_BACKGROUND_TYPE,
	VIDEO_BACKGROUND_TYPE,
} from './constants';

import { ALL_DEVICES } from '../../constants';

import SelectBackgroundType from './select-background-type';
import Video from './video';
import Image from './image';
import Gradient from './gradient';
import BlendMode from '../blend-mode';
import Filter from '../filter';
import Opacity from '../opacity';
import Color from '../color';
import { getCssMemoValue } from '../../hooks/use-block-memo';

function changeBgType( {
	value,
	blockMemo,
	setBgType,
	attributes,
	setAttributes,
	devices,
	selector,
} ) {
	setBgType( value );

	if ( value === IMAGE_BACKGROUND_TYPE ) {
		const { properties, settings } = getCssMemoValue(
			blockMemo,
			'css',
			getSelectorPropsSettingsForAllDevices,
			{
				selector,
				devices,
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
		setPropsSettingsForVariousMedia( {
			attributes,
			setAttributes,
			selector,
			mediaProps: {
				...properties,
			},
			mediaSettings: {
				...settings,
			},
			allMediaSettings: {
				[ names.video ]: null,
			},
		} );
	} else if ( value === GRADIENT_BACKGROUND_TYPE ) {
		const backgroundImage = getCssMemoValue(
			blockMemo,
			'css',
			getPropValue,
			{
				selector,
				devices: ALL_DEVICES,
				propName: names.gradient,
			}
		);

		setPropsSettingsForVariousMedia( {
			attributes,
			setAttributes,
			selector,
			mediaProps: {
				[ ALL_DEVICES ]: {
					backgroundImage,
				},
			},
			allMediaProps: {
				[ names.image ]: '',
				[ names.size ]: '',
				[ names.repeat ]: '',
				[ names.position ]: '',
				[ names.attachment ]: '',
				[ names.opacity ]: '',
			},
			allMediaSettings: {
				[ names.image ]: null,
				[ names.video ]: null,
			},
		} );
	} else if ( value === VIDEO_BACKGROUND_TYPE ) {
		const videoSettings = getCssMemoValue(
			blockMemo,
			'css',
			getSelectorSetting,
			{
				selector,
				devices: ALL_DEVICES,
				propName: names.video,
			}
		);
		const { url, id } = videoSettings || {};

		setPropsSettingsForVariousMedia( {
			attributes,
			setAttributes,
			selector,
			allMediaProps: {
				[ names.image ]: '',
				[ names.size ]: '',
				[ names.repeat ]: '',
				[ names.position ]: '',
				[ names.attachment ]: '',
				[ names.opacity ]: '',
			},
			mediaSettings: {
				[ ALL_DEVICES ]: {
					[ names.image ]: null,
					[ names.video ]: url ? { url, id } : null,
				},
			},
			allMediaSettings: {
				[ names.image ]: null,
			},
		} );
	} else {
		setPropsSettingsForVariousMedia( {
			attributes,
			setAttributes,
			selector,
			allMediaProps: {
				[ names.image ]: '',
				[ names.size ]: '',
				[ names.repeat ]: '',
				[ names.position ]: '',
				[ names.attachment ]: '',
				[ names.opacity ]: '',
			},
			allMediaSettings: {
				[ names.image ]: null,
				[ names.video ]: null,
			},
		} );
	}
}

export default function Normal( props ) {
	const {
		attributes,
		setAttributes,
		selector,
		devices,
		isBgOverlay,
		canShowBackgroundVideo,
		blockMemo,
	} = props;
	const [ bgType, setBgType ] = useState( () => {
		const imageSettings = getSelectorSetting( {
			attributes,
			devices,
			selector,
			propName: names.image,
		} );
		const { url } = imageSettings || {};
		if ( url ) {
			return IMAGE_BACKGROUND_TYPE;
		}
		const gradient = getPropValue( {
			attributes,
			devices,
			selector,
			propName: names.image,
		} );
		if ( ! url && gradient ) {
			return GRADIENT_BACKGROUND_TYPE;
		}
		const videoSettings = getSelectorSetting( {
			attributes,
			devices: ALL_DEVICES,
			selector,
			propName: names.video,
		} );
		if ( videoSettings && videoSettings.url ) {
			return VIDEO_BACKGROUND_TYPE;
		}
		return '';
	} );

	const onChangeBgType = useCallback(
		( value ) => {
			changeBgType( {
				attributes,
				setAttributes,
				devices,
				selector,
				blockMemo,
				value,
				setBgType,
			} );
		},
		[ attributes, setAttributes, selector, devices, blockMemo, setBgType ]
	);
	return (
		<>
			<SelectBackgroundType
				backgroundType={ bgType }
				onChange={ onChangeBgType }
				canShowBackgroundVideo={ canShowBackgroundVideo }
			/>
			<Color
				{ ...props }
				devices={ ALL_DEVICES }
				propName={ names.color }
			/>
			{ IMAGE_BACKGROUND_TYPE === bgType && <Image { ...props } /> }
			{ VIDEO_BACKGROUND_TYPE === bgType && (
				<Video { ...props } devices={ ALL_DEVICES } />
			) }
			{ GRADIENT_BACKGROUND_TYPE === bgType && (
				<Gradient { ...props } devices={ ALL_DEVICES } />
			) }
			{ isBgOverlay && (
				<>
					<Opacity { ...props } devices={ ALL_DEVICES } />
					<Filter { ...props } devices={ ALL_DEVICES } />
					<BlendMode { ...props } devices={ ALL_DEVICES } />
				</>
			) }
		</>
	);
}
