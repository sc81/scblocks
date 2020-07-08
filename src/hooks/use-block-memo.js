/**
 * External dependencies
 */
import { cloneDeep } from 'lodash';
/**
 * WordPress dependencies
 */
import { useRef } from '@wordpress/element';

export function getCssMemoValue( blockMemo, type, callback, callbackProps ) {
	return callback( {
		...callbackProps,
		attributes: blockMemo.current[ type ],
	} );
}
export function setCssMemoValue( blockMemo, callback, callbackProps ) {
	callback( {
		...callbackProps,
		attributes: blockMemo.current.css,
		setAttributes: ( css ) => {
			blockMemo.current.css = css;
		},
	} );
}
export function getLastActivePanel( blockMemo ) {
	return blockMemo.current.lastActivePanel;
}

export function setLastActivePanel( blockMemo, panelName, value ) {
	blockMemo.current.lastActivePanel = {
		...blockMemo.current.lastActivePanel,
		[ panelName ]: value,
	};
}

export function useBlockMemo( attributes, selectors ) {
	const blockMemo = useRef( null );

	if ( blockMemo.current === null ) {
		blockMemo.current = {};
		blockMemo.current.initialCss = { css: cloneDeep( attributes.css ) };
		blockMemo.current.css = { css: {} };

		const obj = {
			tabPanel: 'main',
			selectorPanel: selectors[ 0 ].selector,
			controlsPanel: {},
		};
		selectors.forEach( ( elm ) => {
			obj.controlsPanel[ elm.selector ] = {};
		} );
		blockMemo.current.lastActivePanel = obj;
	}
	return blockMemo;
}
