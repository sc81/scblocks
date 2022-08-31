/**
 * External dependencies
 */
import dompurify from 'dompurify';

export default function sanitizeSVG( svg ) {
	return dompurify.sanitize( svg, {
		USE_PROFILES: {
			svg: true,
			svgFilters: true,
		},
		FORBID_TAGS: [ 'use' ],
		NAMESPACE: 'http://www.w3.org/2000/svg',
	} );
}
