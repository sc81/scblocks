/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { SELECTORS } from '../../block/constants';
import { PLUGIN_NAME } from '../../constants';

export const HEADING_BLOCK_NAME = `${ PLUGIN_NAME }/heading`;

export const selectorsSettings = [
	{
		label: __( 'Heading styles', 'scblocks' ),
		selector: SELECTORS.blockMainSelectorAlias,
		hoverSelector: SELECTORS.blockMainSelectorHoverAlias,
		allowedPanels: {
			colors: {
				textColor: true,
				backgroundColor: true,
				borderColor: true,
				linkColor: {
					hasHoverControls: true,
					selector: SELECTORS.heading.link.alias,
					hoverSelector: SELECTORS.heading.linkHover.alias,
				},
				highlightText: {
					selector: SELECTORS.heading.highlightText.alias,
				},
			},
			background: true,
			typography: true,
			border: true,
			space: {
				padding: true,
				margin: true,
			},
		},
	},
];
