/**
 * WordPress dependencies
 */
import apiFetch from '@wordpress/api-fetch';
import { registerStore } from '@wordpress/data';

/**
 * ScBlocks dependencies
 */
import {
	STORE_NAME,
	PLUGIN_NAME,
	OPTIONS_REST_API_PATH,
} from '@scblocks/constants';

const DEFAULT_STATE = {
	imageUrls: {},
	options: {},
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
	addUsedIcon( id, icon ) {
		return {
			type: 'ADD_USED_ICON',
			id,
			icon,
		};
	},
	fetchFromAPI( path ) {
		return {
			type: 'FETCH_FROM_API',
			path,
		};
	},
	setImageUrls( urls ) {
		return {
			type: 'SET_IMAGE_URLS',
			imageUrls: urls,
		};
	},
	setGoogleFonts( fonts ) {
		return {
			type: 'SET_GOOGLE_FONTS',
			fonts,
		};
	},
	setOptions( options ) {
		return {
			type: 'SET_OPTIONS',
			options,
		};
	},
	setOption( name, value ) {
		return {
			type: 'SET_OPTION',
			name,
			value,
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
			case 'ADD_USED_ICON':
				return {
					...state,
					usedIcons: {
						...state.usedIcons,
						[ action.id ]: action.icon,
					},
				};
			case 'SET_IMAGE_URLS':
				return {
					...state,
					imageUrls: {
						...state.imageUrls,
						...action.imageUrls,
					},
				};
			case 'SET_GOOGLE_FONTS':
				return {
					...state,
					googleFonts: { ...action.fonts },
				};
			case 'SET_OPTIONS':
				return {
					...state,
					options: { ...action.options },
				};
			case 'SET_OPTION':
				return {
					...state,
					options: {
						...state.options,
						[ action.name ]: action.value,
					},
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
		imageUrls( state, id ) {
			if ( state.imageUrls[ id ] ) {
				return state.imageUrls[ id ];
			}

			return {};
		},
		getGoogleFonts( state ) {
			return state.googleFonts;
		},
		getOptions( state ) {
			return state.options;
		},
		getOption( state, name ) {
			return state.options[ name ];
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
		*imageUrls( id ) {
			if ( id === -1 || id === '1' ) {
				return;
			}
			const path = `/scblocks/v1/image-data/${ id }`;
			const urls = yield actions.fetchFromAPI( path );
			return actions.setImageUrls( urls );
		},
		*getGoogleFonts() {
			const path = '/scblocks/v1/google-fonts';
			const fonts = yield actions.fetchFromAPI( path );
			return actions.setGoogleFonts( JSON.parse( fonts ) );
		},
		*getOptions() {
			const options = yield actions.fetchFromAPI( OPTIONS_REST_API_PATH );

			return actions.setOptions( options );
		},
	},
} );
