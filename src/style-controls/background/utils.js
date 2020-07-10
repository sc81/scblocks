export default function retriveUrl( value ) {
	if ( value.includes( 'url(' ) ) {
		return value.replace( /url\(|\)/g, '' );
	}
	return '';
}
