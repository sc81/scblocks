/**
 * WordPress dependencies
 */
import { Path, SVG } from '@wordpress/components';

export default function FontAwesomeIcon( { iconAttr } ) {
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
