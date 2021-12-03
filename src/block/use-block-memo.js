/**
 * External dependencies
 */
import { cloneDeep } from 'lodash';
/**
 * WordPress dependencies
 */
import { useRef } from '@wordpress/element';

export default function useBlockMemo( attributes, selectorsSettings ) {
	const blockMemo = useRef( null );

	if ( blockMemo.current === null ) {
		blockMemo.current = {};
		blockMemo.current.initial = { css: cloneDeep( attributes.css ) };
		blockMemo.current.dynamic = { css: cloneDeep( attributes.css ) };

		const obj = {
			tabPanel: 'style',
			selectorPanel: selectorsSettings[ 0 ].id,
			controlsPanel: {},
		};
		selectorsSettings.forEach( ( elm ) => {
			obj.controlsPanel[ elm.id ] = {};
		} );
		blockMemo.current.lastActivePanel = obj;
	}
	return blockMemo;
}
