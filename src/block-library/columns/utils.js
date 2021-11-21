/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * ScBlocks dependencies
 */
import { BLOCK_SELECTOR } from '@scblocks/block';
import { PLUGIN_NAME } from '@scblocks/constants';

export const COLUMNS_NAME = `${ PLUGIN_NAME }/columns`;

export const COLUMNS_SELECTORS_SETTINGS = [
	{
		label: __( 'Columns Style', 'scblocks' ),
		id: BLOCK_SELECTOR.columns.main.alias,
		selector: BLOCK_SELECTOR.columns.main.alias,
		allowedPanels: {
			space: {
				gap: true,
			},
			position: {
				alignItems: true,
				alignContent: true,
				justifyContent: true,
				flexDirection: true,
				flexWrap: true,
			},
		},
	},
];
