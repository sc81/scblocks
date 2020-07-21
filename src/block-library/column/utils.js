/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { PLUGIN_NAME } from '../../constants';

export const COLUMN_NAME = `${ PLUGIN_NAME }/column`;

export const COLUMN_CLASS = `${ PLUGIN_NAME }-column`;
export const COLUMN_INNER_CLASS = `${ PLUGIN_NAME }-column-inner`;

export const COLUMN_SELECTOR = 'selector';
export const COLUMN_HOVER_SELECTOR = COLUMN_SELECTOR + ':hover';
export const COLUMN_INNER_SELECTOR = `.${ COLUMN_INNER_CLASS }`;

export const selectors = [
	{
		label: __( 'Column' ),
		selector: COLUMN_INNER_SELECTOR,
		allowedPanels: {
			background: true,
			border: true,
			backgroundOverlay: true,
			space: {
				margin: true,
				padding: true,
			},
		},
	},
];
