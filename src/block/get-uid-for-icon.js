function getRandomNumberAsString() {
	return 'id' + ( Math.random() + '' ).replace( '0.', '' );
}

/**
 * Create a unique identifier for an icon that will belong to the icon set.
 *
 * @param {Object} icons Icon set.
 * @return {string} ID
 */
export default function getUidForIcon( icons ) {
	const id = getRandomNumberAsString();
	for ( const uid in icons ) {
		if ( uid === id ) {
			return getUidForIcon( icons );
		}
	}
	return id;
}
