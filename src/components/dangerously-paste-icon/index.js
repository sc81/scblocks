export default function DangerouslyPasteIcon( { icon, className } ) {
	if ( ! icon ) {
		return null;
	}
	return (
		<span
			className={ className }
			dangerouslySetInnerHTML={ { __html: icon } }
		/>
	);
}
