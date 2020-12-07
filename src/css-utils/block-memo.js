/**
 * External dependencies
 */
import { cloneDeep } from 'lodash';

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

export function setMemoBackgroundImageId( blockMemo, device, id ) {
	if ( ! blockMemo.current.backgroundImageIds && ! id ) {
		return;
	}
	if ( ! blockMemo.current.backgroundImageIds ) {
		blockMemo.current.backgroundImageIds = {};
	}
	if ( id ) {
		blockMemo.current.backgroundImageIds = {
			...blockMemo.current.backgroundImageIds,
			[ device ]: id,
		};
	} else {
		delete blockMemo.current.backgroundImageIds[ device ];
	}
}

export function getMemoBackgroundImageIds( blockMemo ) {
	if ( blockMemo.current.backgroundImageIds ) {
		return cloneDeep( blockMemo.current.backgroundImageIds );
	}
	return null;
}
