/**
 * WordPress dependencies
 */
import { useSelect } from '@wordpress/data';

/**
 * ScBlocks dependencies
 */
import { STORE_NAME } from '@scblocks/constants';

export default function PasteUsedIcon( { iconName, className } ) {
	const usedIcons = useSelect(
		( select ) => select( STORE_NAME ).usedIcons(),
		[]
	);
	if ( ! usedIcons || ! usedIcons[ iconName ] ) {
		return null;
	}
	return (
		<span
			className={ className }
			dangerouslySetInnerHTML={ { __html: usedIcons[ iconName ] } }
		/>
	);
}
