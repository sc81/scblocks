/**
 * ScBlocks dependencies
 */
import { getPropValue } from '@scblocks/css-utils';
import { ALL_DEVICES } from '@scblocks/constants';

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

export default function Background( props ) {
	const { attributes, selector, devices } = props;
	const backgroundImage = getPropValue( {
		attributes,
		devices,
		selector,
		propName: names.image,
	} );

	let bgType = '';
	if ( backgroundImage.startsWith( 'url(' ) ) {
		bgType = IMAGE_BACKGROUND_TYPE;
	}
	if (
		backgroundImage.startsWith( 'linear-gradient(' ) ||
		backgroundImage.startsWith( 'radial-gradient(' )
	) {
		bgType = GRADIENT_BACKGROUND_TYPE;
	}

	return (
		<>
			<Color
				{ ...props }
				devices={ ALL_DEVICES }
				propName={ names.color }
			/>
			{ ( ! bgType || IMAGE_BACKGROUND_TYPE === bgType ) && (
				<Image { ...props } />
			) }
			{ ( ! bgType || GRADIENT_BACKGROUND_TYPE === bgType ) && (
				<Gradient { ...props } />
			) }
		</>
	);
}
