export default function retriveUrl( value ) {
	if ( value.startsWith( 'url(' ) ) {
		return value.trim().replace( /^url\(|\)$/g, '' );
	}
	return '';
}
