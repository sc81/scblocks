export function getControlSelector( panelName, controlName, selectorSettings ) {
	if (
		selectorSettings.panels[ panelName ].controls &&
		selectorSettings.panels[ panelName ].controls[ controlName ] &&
		selectorSettings.panels[ panelName ].controls[ controlName ].selector
	) {
		return selectorSettings.panels[ panelName ].controls[ controlName ]
			.selector;
	}
	return selectorSettings.panels[ panelName ].selector;
}
export function getControlHoverSelector(
	panelName,
	controlName,
	selectorSettings
) {
	if (
		selectorSettings.panels[ panelName ].controls &&
		selectorSettings.panels[ panelName ].controls[ controlName ] &&
		selectorSettings.panels[ panelName ].controls[ controlName ]
			.hoverSelector
	) {
		return selectorSettings.panels[ panelName ].controls[ controlName ]
			.hoverSelector;
	}
	return selectorSettings.panels[ panelName ].hoverSelector;
}
