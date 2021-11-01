/**
 * WordPress dependencies
 */
import { useSelect } from '@wordpress/data';

/**
 * ScBlocks dependencies
 */
import { STORE_NAME } from '@scblocks/constants';

export default function PasteUsedIcon( { iconId, className } ) {
	const usedIcons = useSelect(
		( select ) => select( STORE_NAME ).usedIcons(),
		[]
	);
	if ( ! usedIcons || ! usedIcons[ iconId ] ) {
		return null;
	}
	return (
		<span
			className={ className }
			dangerouslySetInnerHTML={ { __html: usedIcons[ iconId ] } }
		/>
	);
}
