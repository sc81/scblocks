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
		label: __( 'Column style', 'scblocks' ),
		id: SELECTORS.column.content.alias,
		selector: SELECTORS.column.content.alias,
		allowedPanels: {
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
				padding: true,
				minHeight: true,
			},
			flex: {
				alignItems: true,
				flexDirection: true,
				justifyContent: true,
			},
		},
	},
];
