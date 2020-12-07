/**
 * WordPress dependencies
 */
import { useMemo } from '@wordpress/element';

export default function usePanelActiveControl(
	selectorSettings,
	props,
	panelName
) {
	const activeControls = useMemo( () => {
		const state = {};
		props.forEach( ( prop ) => ( state[ prop ] = false ) );

		Object.keys( selectorSettings.allowedPanels[ panelName ] ).forEach(
			( name ) => {
				state[ name ] = true;
			}
		);

		return state;
	}, [ selectorSettings, props, panelName ] );

	return activeControls;
}
