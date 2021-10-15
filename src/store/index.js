/**
 * WordPress dependencies
 */
import apiFetch from '@wordpress/api-fetch';
import { registerStore } from '@wordpress/data';

/**
 * ScBlocks dependencies
 */
import { STORE_NAME, PLUGIN_NAME } from '@scblocks/constants';

const DEFAULT_STATE = {
	svgShapes: undefined,
	dashicons: undefined,
	fontAwesome: undefined,
};

const actions = {
	setSvgShapes( svgShapes ) {
		return {
			type: 'SET_SVG_SHAPES',
			svgShapes,
		};
	},
	setDashicons( dashicons ) {
		return {
			type: 'SET_DASHICONS',
			dashicons,
		};
	},
	setFontAwesome( fontAwesome ) {
		return {
			type: 'SET_FONT_AWESOME',
			fontAwesome,
		};
	},
	setUsedIcons( usedIcons ) {
		return {
			type: 'SET_USED_ICONS',
			usedIcons,
		};
	},
	fetchFromAPI( path ) {
		return {
			type: 'FETCH_FROM_API',
			path,
		};
	},
};

registerStore( STORE_NAME, {
	reducer( state = DEFAULT_STATE, action ) {
		switch ( action.type ) {
			case 'SET_SVG_SHAPES':
				return {
					...state,
					svgShapes: [ ...action.svgShapes ],
				};
			case 'SET_DASHICONS':
				return {
					...state,
					dashicons: { ...action.dashicons },
				};
			case 'SET_FONT_AWESOME':
				return {
					...state,
					fontAwesome: { ...action.fontAwesome },
				};
			case 'SET_USED_ICONS':
				return {
					...state,
					usedIcons: { ...action.usedIcons },
				};
		}

		return state;
	},
	actions,
	selectors: {
		getSvgShapes( state ) {
			return state.svgShapes;
		},
		getDashicons( state ) {
			return state.dashicons;
		},
		getFontAwesome( state ) {
			return state.fontAwesome;
		},
		usedIcons( state ) {
			return state.usedIcons;
		},
	},
	controls: {
		FETCH_FROM_API( action ) {
			return apiFetch( { path: action.path } );
		},
	},
	resolvers: {
		*getSvgShapes() {
			const path = `/${ PLUGIN_NAME }/v1/svg-shapes`;
			let shapes = yield actions.fetchFromAPI( path );
			try {
				shapes = JSON.parse( shapes );
				return actions.setSvgShapes( shapes );
			} catch ( e ) {
				throw e;
			}
		},
		*getDashicons() {
			const path = `/${ PLUGIN_NAME }/v1/icons/2`;
			let icons = yield actions.fetchFromAPI( path );
			icons = JSON.parse( icons );
			return actions.setDashicons( icons );
		},
		*getFontAwesome() {
			const path = `/${ PLUGIN_NAME }/v1/icons/1`;
			let icons = yield actions.fetchFromAPI( path );
			icons = JSON.parse( icons );
			return actions.setFontAwesome( icons );
		},
		*usedIcons() {
			const path = `/${ PLUGIN_NAME }/v1/icons/3`;
			const icons = yield actions.fetchFromAPI( path );
			return actions.setUsedIcons( icons );
		},
	},
} );
