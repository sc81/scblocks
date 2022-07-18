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
		const panelProps =
			selectorSettings.panels[ panelName ].props ||
			selectorSettings.panels[ panelName ];
		Object.keys( panelProps ).forEach( ( name ) => {
			state[ name ] = true;
		} );

		return state;
	}, [ selectorSettings, props, panelName ] );

	return activeControls;
}
