/**
 * WordPress dependencies
 */
import { useMemo } from '@wordpress/element';

export default function useDataScblocksAttr( attributes, setAttributes ) {
	const dataScblocks = useMemo( () => {
		if ( attributes.dataScblocks ) {
			return JSON.parse( attributes.dataScblocks );
		}
		return {};
	}, [ attributes.dataScblocks ] );

	function setDataScblocks( name, value ) {
		setAttributes( {
			dataScblocks: JSON.stringify( {
				...dataScblocks,
				[ name ]: value,
			} ),
		} );
	}
	return {
		dataScblocks,
		setDataScblocks,
	};
}
