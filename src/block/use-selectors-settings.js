/**
 * External dependencies
 */
import { produce } from 'immer';

/**
 * WordPress dependencies
 */
import { useState } from '@wordpress/element';

function getNextSettings( selectorsSettings, nextSelectorSettings, id ) {
	return produce( selectorsSettings, ( draft ) => {
		const index = draft.findIndex( ( elm ) => elm.id === id );
		if ( index > -1 ) {
			draft[ index ] = nextSelectorSettings;
		}
	} );
}

export default function useSelectorsSettings( initialSettings ) {
	const [ settings, setSettings ] = useState( initialSettings );

	return [ settings, setSettings, getNextSettings ];
}
