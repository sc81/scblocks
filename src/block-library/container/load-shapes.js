/**
 * WordPress dependencies
 */
import { useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';

/**
 * ScBlocks dependencies
 */
import { PLUGIN_NAME } from '@scblocks/constants';

let shapes;

let isLocked = false;

export default function useLoadShapes() {
	const [ isLoaded, setIsLoaded ] = useState( false );

	useEffect( () => {
		if ( ! isLocked ) {
			if ( ! shapes ) {
				apiFetch( {
					path: `/${ PLUGIN_NAME }/v1/svg-shapes`,
				} )
					.then( ( resp ) => {
						shapes = JSON.parse( resp );

						isLocked = false;
						setIsLoaded( true );
					} )
					.catch( () => {
						isLocked = false;
						shapes = [];
						setIsLoaded( true );
					} );
			} else {
				setIsLoaded( true );
			}
		}
	}, [] );
	return [ shapes, isLoaded ];
}
