/**
 * External dependencies
 */
import { produce } from 'immer';

/**
 * WordPress dependencies
 */
import { useState } from '@wordpress/element';
import { applyFilters } from '@wordpress/hooks';

import { BLOCK_SELECTOR } from '.';

function getNextSettings( selectorsSettings, nextSettings, id ) {
	return produce( selectorsSettings, ( draft ) => {
		const index = draft.findIndex( ( elm ) => elm.id === id );
		if ( index > -1 ) {
			draft[ index ] = nextSettings;
		}
	} );
}

export default function useSelectorsSettings( blockName, selectorsSettings ) {
	const [ settings, setSettings ] = useState( selectorsSettings );

	applyFilters(
		`scblocks.${ blockName }.selectorsSettings`,
		settings,
		setSettings,
		getNextSettings,
		BLOCK_SELECTOR
	);

	return [ settings, setSettings, getNextSettings ];
}
