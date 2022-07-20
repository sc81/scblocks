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
		const { displayAllProps } = selectorSettings.panels[ panelName ];
		props.forEach( ( prop ) => ( state[ prop ] = !! displayAllProps ) );
		const panelProps =
			selectorSettings.panels[ panelName ].props ||
			selectorSettings.panels[ panelName ];
		if ( ! displayAllProps ) {
			Object.keys( panelProps ).forEach( ( name ) => {
				state[ name ] = true;
			} );
		}

		return state;
	}, [ selectorSettings, props, panelName ] );

	return activeControls;
}
