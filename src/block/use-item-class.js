/**
 * WordPress dependencies
 */

import { useSelect } from '@wordpress/data';

/**
 * ScBlocks dependencies
 */
import { CORE_BLOCK_EDITOR_STORE_NAME } from '@scblocks/constants';
/**
 * Internal dependencies
 */
import getUidClass from './get-uid-class';

export default function useItemClass( clientId ) {
	return useSelect(
		( select ) => {
			const { getBlockParents, getBlockName } = select(
				CORE_BLOCK_EDITOR_STORE_NAME
			);
			let itemClass = '';
			const parents = getBlockParents( clientId, true );
			if ( parents.length ) {
				const name = getBlockName( parents[ 0 ] );
				if ( name.startsWith( 'scblocks' ) ) {
					itemClass = getUidClass( name, parents[ 0 ] ) + '-item';
				}
			}
			return itemClass;
		},
		[ clientId ]
	);
}
