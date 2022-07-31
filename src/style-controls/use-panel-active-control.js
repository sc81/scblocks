/**
 * WordPress dependencies
 */
import { useMemo } from '@wordpress/element';

export default function usePanelActiveControl(
	selectorSettings,
	availableControls,
	panelName
) {
	const activeControls = useMemo( () => {
		const state = {};
		const { displayAllProps } = selectorSettings.panels[ panelName ];
		availableControls.forEach(
			( name ) => ( state[ name ] = !! displayAllProps )
		);
		const controls = selectorSettings.panels[ panelName ].controls;
		if ( ! displayAllProps ) {
			Object.keys( controls ).forEach( ( name ) => {
				state[ name ] = true;
			} );
		}

		return state;
	}, [ selectorSettings, availableControls, panelName ] );

	return activeControls;
}
