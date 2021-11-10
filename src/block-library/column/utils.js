/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * ScBlocks dependencies
 */
import { BLOCK_SELECTOR } from '@scblocks/block';
import { PLUGIN_NAME } from '@scblocks/constants';

export const COLUMN_NAME = `${ PLUGIN_NAME }/column`;

export const COLUMN_SELECTORS_SETTINGS = [
	{
		label: __( 'Column Style', 'scblocks' ),
		id: BLOCK_SELECTOR.column.main.alias,
		selector: BLOCK_SELECTOR.column.main.alias,
		allowedPanels: {
			typography: true,
			colors: {
				textColor: true,
				linkColor: {
					hasHoverControls: true,
					selector: BLOCK_SELECTOR.column.link.alias,
					hoverSelector: BLOCK_SELECTOR.column.linkHover.alias,
				},
				backgroundColor: true,
				borderColor: true,
			},
			background: true,
			border: true,
			space: {
				margin: true,
				padding: true,
				minHeight: true,
			},
			position: {
				order: true,
				zIndex: true,
				alignItems: true,
				justifyContent: true,
			},
		},
	},
];
