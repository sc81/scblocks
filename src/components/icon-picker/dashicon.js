/**
 * WordPress dependencies
 */
import { Path, SVG } from '@wordpress/components';

export default function Dashicon( { d, size = 24 } ) {
	return (
		<SVG viewBox="0 0 24 24" width={ size } height={ size }>
			<Path d={ d } />
		</SVG>
	);
}
