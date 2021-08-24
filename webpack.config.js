const path = require( 'path' );
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );

const DependencyExtractionWebpackPlugin = require( '@wordpress/dependency-extraction-webpack-plugin' );

const namespace = '@scblocks/';

function requestToExternal( request ) {
	if ( request.startsWith( namespace ) ) {
		return [
			'scblocks',
			camelCaseDash( request.substring( namespace.length ) ),
		];
	}
}
function requestToHandle( request ) {
	if ( request.startsWith( namespace ) ) {
		return 'scblocks-' + request.substring( namespace.length );
	}
}
function camelCaseDash( string ) {
	return string.replace( /-([a-z])/g, ( match, letter ) =>
		letter.toUpperCase()
	);
}

module.exports = {
	...defaultConfig,
	entry: {
		index: path.resolve( process.cwd(), 'src', 'index.js' ),
		constants: path.resolve(
			process.cwd(),
			'src',
			'constants',
			'index.js'
		),
		block: path.resolve( process.cwd(), 'src', 'block', 'index.js' ),
		cssUtils: path.resolve( process.cwd(), 'src', 'css-utils', 'index.js' ),
		styleControls: path.resolve(
			process.cwd(),
			'src',
			'style-controls',
			'index.js'
		),
		components: path.resolve(
			process.cwd(),
			'src',
			'components',
			'index.js'
		),
		store: path.resolve( process.cwd(), 'src', 'store', 'index.js' ),
		dashboard: path.resolve(
			process.cwd(),
			'src',
			'dashboard',
			'index.js'
		),
	},
	output: {
		...defaultConfig.output,
		devtoolNamespace: 'scblocks',
		library: [ 'scblocks', '[name]' ],
		libraryTarget: 'window',
	},
	plugins: [
		...defaultConfig.plugins.filter(
			( plugin ) =>
				plugin.constructor.name !== 'DependencyExtractionWebpackPlugin'
		),
		new DependencyExtractionWebpackPlugin( {
			injectPolyfill: true,
			requestToExternal,
			requestToHandle,
		} ),
	],
};
