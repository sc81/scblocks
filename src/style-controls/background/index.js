/**
 * External dependencies
 */
import { get } from 'lodash';

/**
 * WordPress dependencies
 */
import { applyFilters } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';

/**
 * ScBlocks dependencies
 */
import { getPropValue } from '@scblocks/css-utils';
import { ALL_DEVICES, DESKTOP_DEVICE } from '@scblocks/constants';

/**
 * Internal dependencies
 */
import {
	names,
	IMAGE_BACKGROUND_TYPE,
	GRADIENT_BACKGROUND_TYPE,
} from './constants';
import Image from './image';
import Gradient from './gradient';
import Color from '../color';
import StyleControlsPanel from '../style-controls-panel';

export default function Background( props ) {
	const { attributes, selector, devices } = props;
	const { bgImage = {} } = attributes;
	const currentDevice = applyFilters(
		'scblocks.backgroundControl.device',
		DESKTOP_DEVICE,
		devices
	);
	const showSelectDevice = applyFilters(
		'scblocks.backgroundControl.showSelectDevice',
		false
	);
	const isImage = !! get( bgImage, currentDevice, false );
	const backgroundImage = getPropValue( {
		attributes,
		devices: currentDevice,
		selector,
		propName: names.image,
	} );

	let bgType = '';
	if ( backgroundImage ) {
		bgType = GRADIENT_BACKGROUND_TYPE;
	}
	if ( backgroundImage && isImage ) {
		bgType = IMAGE_BACKGROUND_TYPE;
	}

	return (
		<StyleControlsPanel
			{ ...props }
			panelTitle={ __( 'Background', 'scblocks' ) }
			panelName="background"
		>
			<Color
				{ ...props }
				devices={ ALL_DEVICES }
				propName={ names.color }
			/>
			{ ( ! bgType || IMAGE_BACKGROUND_TYPE === bgType ) && (
				<Image
					{ ...props }
					devices={ currentDevice }
					showSelectDevice={ showSelectDevice }
				/>
			) }
			{ ( ! bgType || GRADIENT_BACKGROUND_TYPE === bgType ) && (
				<Gradient
					{ ...props }
					devices={ currentDevice }
					showSelectDevice={ showSelectDevice }
				/>
			) }
		</StyleControlsPanel>
	);
}
