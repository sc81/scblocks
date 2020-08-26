export function getControlSelector( panelName, controlName, selectorSettings ) {
	if ( typeof selectorSettings.allowedPanels[ panelName ] !== 'object' ) {
		return selectorSettings.selector;
	}
	if (
		typeof selectorSettings.allowedPanels[ panelName ][ controlName ] ===
			'object' &&
		selectorSettings.allowedPanels[ panelName ][ controlName ].selector
	) {
		return selectorSettings.allowedPanels[ panelName ][ controlName ]
			.selector;
	}
	return selectorSettings.selector;
}
export function getControlHoverSelector(
	panelName,
	controlName,
	selectorSettings
) {
	if ( typeof selectorSettings.allowedPanels[ panelName ] !== 'object' ) {
		return selectorSettings.hoverSelector;
	}
	if (
		typeof selectorSettings.allowedPanels[ panelName ][ controlName ] ===
			'object' &&
		selectorSettings.allowedPanels[ panelName ][ controlName ].hoverSelector
	) {
		return selectorSettings.allowedPanels[ panelName ][ controlName ]
			.hoverSelector;
	}
	return selectorSettings.hoverSelector;
}
