/**
 * WordPress dependencies
 */
import { useRef } from '@wordpress/element';

export function isActiveSelector( activityState, selector ) {
	return activityState.current[ selector ];
}
export function setSelectorActivity( activityState, selector, value ) {
	activityState.current[ selector ] = value;
}

export function useSelectorsActivity( selectors ) {
	const activity = useRef( null );
	if ( activity.current === null ) {
		activity.current = {};
		selectors.forEach( ( elm ) => {
			if ( elm.isActive === false ) {
				activity.current[ elm.selector ] = elm.isActive;
			} else {
				activity.current[ elm.selector ] = true;
			}
		} );
	}
	return activity;
}
