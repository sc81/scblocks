/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { BLOCK_SELECTOR } from '../../block/constants';
import { PLUGIN_NAME } from '../../constants';

export const COLUMNS_NAME = `${ PLUGIN_NAME }/columns`;

export const COLUMNS_SELECTORS_SETTINGS = [
	{
		label: __( 'Columns Style', 'scblocks' ),
		id: BLOCK_SELECTOR.columns.main.alias,
		selector: BLOCK_SELECTOR.columns.main.alias,
		allowedPanels: {
			space: true,
			position: {
				alignItems: true,
				flexDirection: true,
			},
		},
	},
];
