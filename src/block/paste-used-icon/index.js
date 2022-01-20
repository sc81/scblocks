import useGetIcon from '../use-get-icon';

export default function PasteUsedIcon( { iconId, iconPostId, className } ) {
	const icon = useGetIcon( iconId, iconPostId );
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
