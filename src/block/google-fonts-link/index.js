export default function GoogleFontsLink( {
	attributes: { googleFont, fontFamily, googleFontVariants },
} ) {
	if ( ! googleFont || ! fontFamily ) {
		return null;
	}
	return (
		<link
			rel="stylesheet"
			href={
				'https://fonts.googleapis.com/css?family=' +
				fontFamily.replace( / /g, '+' ) +
				':' +
				googleFontVariants
			}
		/>
	);
}
