/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { PLUGIN_NAME } from '../../constants';
import { COLUMN_INNER_SELECTOR } from '../column/utils';

export const COLUMNS_CLASS = `${ PLUGIN_NAME }-columns`;
export const COLUMNS_SELECTOR = 'selector';
export const COLUMNS_HOVER_SELECTOR = 'selector:hover';

export const selectors = [
	{
		label: __( 'Columns block' ),
		selector: COLUMNS_SELECTOR,
		allowedPanels: {
			typography: true,
			background: true,
			backgroundOverlay: true,
			space: {
				margin: true,
				minHeight: true,
			},
			flex: {
				alignItems: true,
				flexDirection: true,
			},
		},
	},
	{
		label: __( 'All Columns' ),
		selector: COLUMN_INNER_SELECTOR,
		allowedPanels: {
			background: true,
			space: {
				margin: true,
				padding: true,
			},
			border: true,
		},
	},
];
