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
};

const actions = {
	setSvgShapes( svgShapes ) {
		return {
			type: 'SET_SVG_SHAPES',
			svgShapes,
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
		}

		return state;
	},
	actions,
	selectors: {
		getSvgShapes( state ) {
			return state.svgShapes;
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
	},
} );
