/**
 * WordPress dependencies
 */
import { useRef } from '@wordpress/element';

export function setSelectorActivity( activityState, selectorId, value ) {
	activityState.current[ selectorId ] = value;
}

export function useSelectorsActivity( selectorsSettings ) {
	const activity = useRef( null );
	if ( activity.current === null ) {
		activity.current = {};
		selectorsSettings.forEach( ( elm ) => {
			if ( elm.isActive === false ) {
				activity.current[ elm.id ] = elm.isActive;
			} else {
				activity.current[ elm.id ] = true;
			}
		} );
	}
	return activity;
}
