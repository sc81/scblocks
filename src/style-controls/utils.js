export function getControlSelector( panelName, controlName, selectorSettings ) {
	if ( typeof selectorSettings.panels[ panelName ] !== 'object' ) {
		return selectorSettings.selector;
	}
	if (
		typeof selectorSettings.panels[ panelName ][ controlName ] ===
			'object' &&
		selectorSettings.panels[ panelName ][ controlName ].selector
	) {
		return selectorSettings.panels[ panelName ][ controlName ].selector;
	}
	return selectorSettings.selector;
}
export function getControlHoverSelector(
	panelName,
	controlName,
	selectorSettings
) {
	if ( typeof selectorSettings.panels[ panelName ] !== 'object' ) {
		return selectorSettings.hoverSelector;
	}
	if (
		typeof selectorSettings.panels[ panelName ][ controlName ] ===
			'object' &&
		selectorSettings.panels[ panelName ][ controlName ].hoverSelector
	) {
		return selectorSettings.panels[ panelName ][ controlName ]
			.hoverSelector;
	}
	return selectorSettings.hoverSelector;
}
