/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * ScBlocks dependencies
 */
import { BLOCK_SELECTOR } from '@scblocks/block';

export const GRID_SELECTORS_SETTINGS = [
	{
		label: __( 'Grid Style', 'scblocks' ),
		id: BLOCK_SELECTOR.grid.main.alias,
		selector: BLOCK_SELECTOR.grid.main.alias,
		allowedPanels: {
			space: {
				gap: true,
			},
			position: {
				alignItems: true,
				justifyContent: true,
			},
		},
	},
];
