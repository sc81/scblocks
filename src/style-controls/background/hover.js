/**
 * WordPress dependencies
 */
import { useState, useCallback } from '@wordpress/element';

/**
 * Internal dependencies
 */
import {
	setPropsSettings,
	getPropValue,
	getSelectorPropsSettings,
	getPropertiesValue,
} from '../../utils';
import {
	names,
	IMAGE_BACKGROUND_TYPE,
	GRADIENT_BACKGROUND_TYPE,
} from './constants';

import SelectBackgroundType from './select-background-type';
import Gradient from './gradient';
import Image from './image';
import Filter from '../filter';
import Opacity from '../opacity';
import Color from '../color';
import { getCssMemoValue } from '../../hooks/use-block-memo';
import retriveUrl from './utils';

export default function Hover( props ) {
	const {
		attributes,
		setAttributes,
		selector,
		devices,
		isBgOverlay,
		blockMemo,
	} = props;

	const [ bgType, setBgType ] = useState( () => {
		const backgroundImage = getPropValue( {
			attributes,
			devices,
			selector,
			propName: names.image,
		} );
		if ( ! backgroundImage ) {
			return '';
		}
		if ( retriveUrl( backgroundImage ) ) {
			return IMAGE_BACKGROUND_TYPE;
		}
		return GRADIENT_BACKGROUND_TYPE;
	} );

	const onChangeBgType = useCallback(
		( value ) => {
			setBgType( value );

			if ( value === IMAGE_BACKGROUND_TYPE ) {
				const { properties, settings } = getCssMemoValue(
					blockMemo,
					'dynamic',
					getSelectorPropsSettings,
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
				setPropsSettings( {
					attributes,
					setAttributes,
					devices,
					selector,
					props: {
						...properties,
					},
					settings: { ...settings },
				} );
			} else if ( value === GRADIENT_BACKGROUND_TYPE ) {
				const properties = getCssMemoValue(
					blockMemo,
					'dynamic',
					getPropertiesValue,
					{
						selector,
						devices,
						props: [ names.image, names.opacity ],
					}
				);
				setPropsSettings( {
					attributes,
					setAttributes,
					devices,
					selector,
					props: {
						...properties,
						[ names.size ]: '',
						[ names.repeat ]: '',
						[ names.position ]: '',
						[ names.attachment ]: '',
					},
					settings: {
						[ names.image ]: null,
					},
				} );
			} else {
				setPropsSettings( {
					attributes,
					setAttributes,
					devices,
					selector,
					props: {
						[ names.image ]: '',
						[ names.size ]: '',
						[ names.repeat ]: '',
						[ names.position ]: '',
						[ names.attachment ]: '',
						[ names.opacity ]: '',
					},
					settings: {
						[ names.image ]: null,
					},
				} );
			}
		},
		[ attributes, setAttributes, devices, selector, setBgType ]
	);

	return (
		<>
			<SelectBackgroundType
				backgroundType={ bgType }
				onChange={ onChangeBgType }
				isHover
			/>
			<Color { ...props } propName={ names.color } />
			{ IMAGE_BACKGROUND_TYPE === bgType && <Image { ...props } /> }
			{ GRADIENT_BACKGROUND_TYPE === bgType && <Gradient { ...props } /> }
			{ isBgOverlay && <Opacity { ...props } /> }
			{ isBgOverlay && <Filter { ...props } /> }
		</>
	);
}
