/**
 * WordPress dependencies
 */
import { useEffect, useRef } from '@wordpress/element';
import { select } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { composeCss } from '../block/compose-css';
import { CORE_BLOCK_EDITOR_STORE_NAME } from '../constants';

const memoizedUidClasses = [];

function createStyleElement() {
	const style = document.createElement( 'style' );
	document.body.appendChild( style );
	return style;
}
const BLOCK_ALIAS = {
	button: 'btn',
	buttons: 'btns',
	column: 'col',
	columns: 'cols',
	container: 'con',
	heading: 'h',
};

export default function useDynamicCss( props, devices ) {
	const {
		clientId,
		attributes: { uidClass, css },
		setAttributes,
		name,
	} = props;
	const style = useRef();

	// block name without namespace
	const blockName = name.split( '/' )[ 1 ];

	// mount
	useEffect( () => {
		const nextUidClass = `scb-${
			BLOCK_ALIAS[ blockName ]
		}-${ clientId.substr( 2, 9 ).replace( '-', '' ) }`;

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
			blockName,
			uidClass: finalUidClass,
			devices,
		} );
	}, [] );
	// update
	useEffect( () => {
		if ( uidClass ) {
			style.current.textContent = composeCss( {
				css,
				blockName,
				uidClass,
				devices,
			} );
		}
	}, [ style, css, blockName, uidClass, devices ] );
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
