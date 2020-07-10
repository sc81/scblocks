/**
 * WordPress dependencies
 */
import { Path, SVG, Dashicon } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { DASHICON_NAME, FONT_AWESOME_NAME } from './utils';

export default function IconComponent( { iconPath, iconAttr } ) {
	const iconPathParts = iconPath.split( '/' );

	switch ( iconPathParts[ 0 ] ) {
		case DASHICON_NAME: {
			return <Dashicon icon={ iconPathParts[ 2 ] } />;
		}
		case FONT_AWESOME_NAME: {
			let viewBox = '0 0 24 24',
				d = 'M0 0h24v24H0V0z';

			if ( typeof iconAttr === 'string' ) {
				const iconParts = iconAttr.split( '|', 2 );
				viewBox = iconParts[ 0 ];
				d = iconParts[ 1 ];
			} else {
				viewBox = iconAttr.viewBox;
				d = iconAttr.pathD;
			}

			return (
				<SVG viewBox={ viewBox } xmlns="http://www.w3.org/2000/svg">
					<Path d={ d } />
				</SVG>
			);
		}
	}
}
