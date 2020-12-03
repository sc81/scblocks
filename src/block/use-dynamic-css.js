/**
 * WordPress dependencies
 */
import { useEffect, useState } from '@wordpress/element';
import { select } from '@wordpress/data';

/**
 * ScBlocks dependencies
 */
import { CORE_BLOCK_EDITOR_STORE_NAME } from '@scblocks/constants';

/**
 * Internal dependencies
 */
import composeCss from './compose-css';

const memoizedUidClasses = [];

const BLOCK_ALIAS = {
	button: 'btn',
	buttons: 'btns',
	column: 'col',
	columns: 'cols',
	container: 'con',
	heading: 'h',
};

export default function useDynamicCss( props, device ) {
	const {
		clientId,
		attributes: { uidClass, css },
		setAttributes,
		name,
	} = props;
	const [ style, setStyle ] = useState( '' );

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

			// it's probably not a reusable block
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

			// probably reusable block
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
		setStyle(
			composeCss( {
				css,
				blockName,
				uidClass: finalUidClass,
				device,
			} )
		);
	}, [] );
	// update
	useEffect( () => {
		if ( uidClass ) {
			setStyle(
				composeCss( {
					css,
					blockName,
					uidClass,
					device,
				} )
			);
		}
	}, [ setStyle, composeCss, css, blockName, uidClass, device ] );

	return style;
}
