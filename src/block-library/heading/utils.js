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
		label: __( 'Heading', 'scblocks' ),
		selector: SELECTORS.blockMainSelectorAlias,
		allowedPanels: {
			colors: {
				textColor: {
					selector: SELECTORS.blockMainSelectorAlias,
				},
				linkColor: {
					selector: SELECTORS.heading.link.alias,
				},
				linkColorHover: {
					selector: SELECTORS.heading.linkHover.alias,
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
