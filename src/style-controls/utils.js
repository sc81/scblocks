export function getSelector( panelName, selectorSettings ) {
	return (
		selectorSettings.panels[ panelName ].selector ||
		selectorSettings.selector
	);
}

export function getHoverSelector( panelName, selectorSettings ) {
	return (
		selectorSettings.panels[ panelName ].hoverSelector ||
		selectorSettings.hoverSelector
	);
}

export function getControlSelector( panelName, controlName, selectorSettings ) {
	if (
		selectorSettings.panels[ panelName ].controls &&
		selectorSettings.panels[ panelName ].controls[ controlName ] &&
		selectorSettings.panels[ panelName ].controls[ controlName ].selector
	) {
		return selectorSettings.panels[ panelName ].controls[ controlName ]
			.selector;
	}
	return getSelector( panelName, selectorSettings );
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
	return getHoverSelector( panelName, selectorSettings );
}
