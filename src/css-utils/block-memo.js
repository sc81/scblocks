export function getCssMemoValue( blockMemo, type, callback, callbackProps ) {
	return callback( {
		...callbackProps,
		attributes: blockMemo.current[ type ],
	} );
}
export function setCssMemoValue( blockMemo, callback, callbackProps ) {
	callback( {
		...callbackProps,
		attributes: blockMemo.current.dynamic,
		setAttributes: ( css ) => {
			blockMemo.current.dynamic = css;
		},
	} );
}
export function getLastActivePanel( blockMemo ) {
	return blockMemo.current.lastActivePanel;
}

export function setLastActivePanel( blockMemo, name, value ) {
	if ( name === 'controlsPanel' ) {
		blockMemo.current.lastActivePanel = {
			...blockMemo.current.lastActivePanel,
			controlsPanel: {
				...blockMemo.current.lastActivePanel.controlsPanel,
				...value,
			},
		};
	} else {
		blockMemo.current.lastActivePanel = {
			...blockMemo.current.lastActivePanel,
			[ name ]: value,
		};
	}
}
