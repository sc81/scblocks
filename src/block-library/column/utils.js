/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { PLUGIN_NAME } from '../../constants';
import { SELECTORS } from '../../block/constants';

export const COLUMN_NAME = `${ PLUGIN_NAME }/column`;

export const selectorsSettings = [
	{
		label: __( 'Column Style', 'scblocks' ),
		id: SELECTORS.column.inner.alias,
		selector: SELECTORS.column.inner.alias,
		allowedPanels: {
			typography: true,
			colors: {
				textColor: true,
				linkColor: {
					hasHoverControls: true,
					selector: SELECTORS.column.link.alias,
					hoverSelector: SELECTORS.column.linkHover.alias,
				},
				backgroundColor: true,
				borderColor: true,
			},
			background: true,
			border: true,
			space: {
				margin: true,
				padding: {
					selector: SELECTORS.column.content.alias,
				},
				minHeight: true,
			},
			flex: {
				alignItems: true,
				justifyContent: true,
			},
			position: {
				order: {
					selector: SELECTORS.blockMainSelectorAlias,
				},
				zIndex: {
					selector: SELECTORS.blockMainSelectorAlias,
				},
			},
		},
	},
];
