module.exports = {
	extends: [ 'plugin:@wordpress/eslint-plugin/recommended' ],
	overrides: [
		{
			files: [ '*.js' ],
			rules: {
				'import/no-unresolved': 'off',
				'import/no-extraneous-dependencies': 'off',
				'@wordpress/no-unsafe-wp-apis': 'off',
			},
		},
	],
};
