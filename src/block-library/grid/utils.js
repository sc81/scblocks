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
			grid: {
				gridTemplateColumns: true,
				gridTemplateRows: true,
				gap: true,
				gridTemplateAreas: true,
				gridAutoFlow: true,
				gridAutoColumns: true,
				gridAutoRows: true,
				justifyItems: true,
				alignItems: true,
				justifyContent: true,
				alignContent: true,
				order: true,
			},
		},
	},
];
