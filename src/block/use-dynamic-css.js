/**
 * WordPress dependencies
 */
import { useEffect, useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import composeCss from './compose-css';
import getUidClass from './get-uid-class';

export default function useDynamicCss( props, device ) {
	const {
		clientId,
		attributes: { css },
		name,
	} = props;
	const [ style, setStyle ] = useState( '' );

	// block name without namespace
	const blockName = name.split( '/' )[ 1 ];

	useEffect( () => {
		setStyle(
			composeCss( {
				css,
				blockName,
				uidClass: getUidClass( name, clientId ),
				device,
			} )
		);
	}, [ setStyle, composeCss, css, blockName, device, clientId ] );

	return style;
}
