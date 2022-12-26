/**
 * WordPress dependencies
 */
import { useEffect, useState, useMemo } from '@wordpress/element';

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
	const blockName = useMemo( () => {
		const string = name.split( '/' )[ 1 ];
		return string.replace( /-([a-z])/g, ( all, letter ) =>
			letter.toUpperCase()
		);
	}, [ name ] );

	const uidClass = useMemo(
		() => getUidClass( name, clientId ),
		[ name, clientId ]
	);

	useEffect( () => {
		setStyle(
			composeCss( {
				css,
				blockName,
				uidClass,
				device,
			} )
		);
	}, [ setStyle, css, blockName, device, clientId ] );

	return style;
}
