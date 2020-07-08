/**
 * WordPress dependencies
 */
import { useEffect, useRef } from '@wordpress/element';
import { select } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { composeCss } from '../block/compose-css';
import { PLUGIN_NAME, CORE_BLOCK_EDITOR_STORE_NAME } from '../constants';

const memoizedUidClasses = [];

function createStyleElement() {
	const style = document.createElement( 'style' );
	document.body.appendChild( style );
	return style;
}

export default function useDynamicCss( props, devices ) {
	const {
		clientId,
		attributes: { uidClass, css },
		setAttributes,
		name,
	} = props;
	const style = useRef();

	// mount
	useEffect( () => {
		const nextUidClass = `${ PLUGIN_NAME }-${ clientId
			.substr( 2, 9 )
			.replace( '-', '' ) }`;

		const blockRootClientId = select(
			CORE_BLOCK_EDITOR_STORE_NAME
		).getBlockRootClientId( clientId );

		let finalUidClass;

		// new block
		if ( ! uidClass ) {
			setAttributes( { uidClass: nextUidClass } );
			memoizedUidClasses.push( nextUidClass );
			finalUidClass = nextUidClass;

			// it's probably not a reusable block, this is a weak test
			// duplicate block
		} else if (
			blockRootClientId !== null &&
			memoizedUidClasses.includes( uidClass )
		) {
			setAttributes( {
				uidClass: nextUidClass,
			} );
			memoizedUidClasses.push( nextUidClass );
			finalUidClass = nextUidClass;

			// probably reusable block, this is a weak test
			// add reusable block uidClass only once
		} else if ( blockRootClientId === null ) {
			if ( ! memoizedUidClasses.includes( uidClass ) ) {
				memoizedUidClasses.push( uidClass );
				finalUidClass = uidClass;
			}
			// existing block
		} else {
			memoizedUidClasses.push( uidClass );
			finalUidClass = uidClass;
		}
		style.current = createStyleElement();
		style.current.textContent = composeCss( {
			css,
			name,
			uidClass: finalUidClass,
			devices,
		} );
	}, [] );
	// update
	useEffect( () => {
		if ( uidClass ) {
			style.current.textContent = composeCss( {
				css,
				name,
				uidClass,
				devices,
			} );
		}
	}, [ style, css, name, uidClass, devices ] );
	// unmount
	useEffect(
		() => () => {
			if ( style.current ) {
				style.current.remove();
			}
		},
		[]
	);
}
