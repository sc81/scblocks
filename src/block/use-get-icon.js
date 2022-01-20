/**
 * WordPress dependencies
 */
import { useSelect } from '@wordpress/data';

/**
 * ScBlocks dependencies
 */
import { STORE_NAME } from '@scblocks/constants';

/**
 * Get icon HTML markup.
 *
 * @param {string} iconId Icon ID
 * @param {string} iconPostId Icon post ID
 *
 * @return {string} HTML
 */
export default function useGetIcon( iconId, iconPostId ) {
	return useSelect(
		( select ) => {
			const icons = select( STORE_NAME ).postedIcons();
			if ( iconPostId && icons ) {
				return icons[ iconPostId ];
			}
			if ( iconId ) {
				return select( STORE_NAME ).icon( iconId );
			}
			return '';
		},
		[ iconPostId, iconId ]
	);
}
