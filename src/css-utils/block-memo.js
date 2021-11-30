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

export function setLastActivePanel( blockMemo, panelName, value ) {
	blockMemo.current.lastActivePanel = {
		...blockMemo.current.lastActivePanel,
		[ panelName ]: value,
	};
}
