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
		attributes: blockMemo.current.dynamic,
		setAttributes: ( css ) => {
			blockMemo.current.dynamic = css;
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

export function useBlockMemo( attributes, selectorsSettings ) {
	const blockMemo = useRef( null );

	if ( blockMemo.current === null ) {
		blockMemo.current = {};
		blockMemo.current.initial = { css: cloneDeep( attributes.css ) };
		blockMemo.current.dynamic = { css: cloneDeep( attributes.css ) };

		const obj = {
			tabPanel: 'main',
			selectorPanel: selectorsSettings[ 0 ].selector,
			controlsPanel: {},
		};
		selectorsSettings.forEach( ( elm ) => {
			obj.controlsPanel[ elm.selector ] = {};
		} );
		blockMemo.current.lastActivePanel = obj;
	}
	return blockMemo;
}
