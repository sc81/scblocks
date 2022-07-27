/**
 * External dependencies
 */
import { produce } from 'immer';

/**
 * WordPress dependencies
 */
import { useState, useRef } from '@wordpress/element';
import { applyFilters } from '@wordpress/hooks';

export function getSelectorIndex( settings, id ) {
	return settings.findIndex( ( elm ) => elm.id === id );
}

export function setSelectorActivity( settings, id, isActive ) {
	return produce( settings, ( draft ) => {
		const index = draft.findIndex( ( elm ) => elm.id === id );
		if ( index > -1 ) {
			draft[ index ].isActive = isActive;
		}
	} );
}
export function setSelectorPanelActivity(
	settings,
	selectorId,
	panelName,
	isActive
) {
	return produce( settings, ( draft ) => {
		const index = draft.findIndex( ( elm ) => elm.id === selectorId );
		if ( index > -1 ) {
			draft[ index ][ panelName ].isActive = isActive;
		}
	} );
}

export function setSelectorPanels( settings, id, nextPanels ) {
	return produce( settings, ( draft ) => {
		const index = draft.findIndex( ( elm ) => elm.id === id );
		if ( index > -1 ) {
			draft[ index ].panels = nextPanels;
		}
	} );
}

export function addSelectorSettings( settings, selectorSettings ) {
	return produce( settings, ( draft ) => {
		draft.push( selectorSettings );
	} );
}

export function useSelectorsSettings( getSettings, blockName, blockProps ) {
	const isSet = useRef( false );
	let initialSettings = [];
	if ( ! isSet.current ) {
		isSet.current = true;
		initialSettings = applyFilters(
			`scblocks.${ blockName }.selectorsSettings`,
			getSettings(),
			blockProps
		);
	}
	return useState( initialSettings );
}
