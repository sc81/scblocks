/**
 * External dependencies
 */
import { produce } from 'immer';

/**
 * WordPress dependencies
 */
import { useState } from '@wordpress/element';
import { doAction } from '@wordpress/hooks';

function addSelectorSettings( settings, selectorSettings ) {
	return [ ...settings, selectorSettings ];
}

function removeSelectorSettings( settings, id ) {
	return produce( settings, ( draft ) => {
		const index = draft.findIndex( ( elm ) => elm.id === id );
		if ( index > -1 ) {
			draft.splice( index, 1 );
		}
	} );
}

function setSelectorAllowedPanels( selectorsSettings, id, getAllowedPanels ) {
	return produce( selectorsSettings, ( draft ) => {
		const index = draft.findIndex( ( elm ) => elm.id === id );
		if ( index > -1 ) {
			draft[ index ].allowedPanels = getAllowedPanels(
				draft[ index ].allowedPanels
			);
		}
	} );
}

export default function useSelectorsSettings(
	initialSettings,
	blockName,
	blockProps
) {
	const [ settings, setSettings ] = useState( initialSettings );

	doAction(
		`scblocks.${ blockName }.selectorsSettings`,
		settings,
		{
			setSettings,
			addSelectorSettings,
			removeSelectorSettings,
			setSelectorAllowedPanels,
		},
		blockProps
	);

	return settings;
}
