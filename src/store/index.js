/**
 * WordPress dependencies
 */
import { registerStore, select, subscribe } from '@wordpress/data';
import apiFetch from '@wordpress/api-fetch';

/**
 * Internal dependencies
 */
import { STORE_NAME, CORE_EDITOR_STORE_NAME, PLUGIN_NAME } from '../constants';

const defaultFonts = {
	primary: '',
	secondary: '',
	tertiary: '',
};

const DEFAULT_STATE = {
	fonts: defaultFonts,
	fontsCssVars: '',
};

const store = registerStore( STORE_NAME, {
	reducer( state = DEFAULT_STATE, action ) {
		switch ( action.type ) {
			case 'SET_FONTS': {
				return {
					...state,
					fonts: action.value,
				};
			}
			case 'SET_FONTS_CSS_VARS': {
				return {
					...state,
					fontsCssVars: action.value,
				};
			}
			case 'INIT_FONT_SETTINGS': {
				return {
					...state,
					fontsCssVars: action.value.fontsCssVars,
					fonts: action.value.fonts,
				};
			}
		}
		return state;
	},
	actions: {
		setFonts( value ) {
			return {
				type: 'SET_FONTS',
				value,
			};
		},
		setFontsCssVars( value ) {
			return {
				type: 'SET_FONTS_CSS_VARS',
				value,
			};
		},
	},
	selectors: {
		getFonts( state ) {
			return { ...state.fonts };
		},
		getFontsCssVars( state ) {
			return state.fontsCssVars;
		},
	},
} );
async function initFonts() {
	const settings = await apiFetch( {
		path: `/${ PLUGIN_NAME }/v1/fonts-settings`,
		method: 'GET',
	} );
	const value = {
		fonts: { ...defaultFonts },
		fontsCssVars: '',
	};
	if ( settings ) {
		if ( settings.fonts ) {
			value.fonts = settings.fonts;
		}
		if ( settings.fontsCssVars ) {
			value.fontsCssVars = settings.fontsCssVars;
		}
	}

	return {
		type: 'INIT_FONT_SETTINGS',
		value,
	};
}
store.dispatch( initFonts() );

//save fonts settings
let isLocked = false;
subscribe( () => {
	if ( isLocked ) {
		return;
	}
	const { isSavingPost, isPublishingPost, isPreviewingPost } = select(
		CORE_EDITOR_STORE_NAME
	);

	if ( isPreviewingPost() || isPublishingPost() || isSavingPost() ) {
		isLocked = true;

		apiFetch( {
			path: `/${ PLUGIN_NAME }/v1/fonts-settings`,
			method: 'POST',
			data: {
				fonts: select( STORE_NAME ).getFonts(),
				fontsCssVars: select( STORE_NAME ).getFontsCssVars(),
			},
		} )
			.then( () => {
				setTimeout( () => ( isLocked = false ), 500 );
			} )
			.catch( () => setTimeout( () => ( isLocked = false ), 500 ) );
	}
} );
