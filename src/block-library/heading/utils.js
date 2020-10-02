/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { BLOCK_SELECTOR } from '../../block/constants';
import { PLUGIN_NAME } from '../../constants';

export const HEADING_BLOCK_NAME = `${ PLUGIN_NAME }/heading`;

export const HEADING_SELECTORS_SETTINGS = [
	{
		label: __( 'Heading Styles', 'scblocks' ),
		id: 'heading',
		selector: BLOCK_SELECTOR.blockMainSelectorAlias,
		allowedPanels: {
			colors: {
				textColor: true,
				backgroundColor: true,
				borderColor: true,
				linkColor: {
					hasHoverControls: true,
					selector: BLOCK_SELECTOR.heading.link.alias,
					hoverSelector: BLOCK_SELECTOR.heading.linkHover.alias,
				},
				highlightText: {
					selector: BLOCK_SELECTOR.heading.highlightText.alias,
				},
			},
			typography: true,
			border: true,
			space: {
				padding: true,
				margin: true,
			},
		},
	},
	{
		label: __( 'Heading Styles', 'scblocks' ),
		id: 'wrapper',
		selector: BLOCK_SELECTOR.blockMainSelectorAlias,
		allowedPanels: {
			colors: {
				textColor: true,
				backgroundColor: true,
				borderColor: true,
				linkColor: {
					hasHoverControls: true,
					selector: BLOCK_SELECTOR.headingWrapped.link.alias,
					hoverSelector:
						BLOCK_SELECTOR.headingWrapped.linkHover.alias,
				},
				highlightText: {
					selector: BLOCK_SELECTOR.headingWrapped.highlightText.alias,
				},
			},
			typography: {
				selector: BLOCK_SELECTOR.headingWrapped.text.alias,
			},
			border: true,
			space: {
				padding: true,
				margin: true,
			},
			position: {
				flexDirection: true,
				alignItems: true,
				justifyContent: true,
			},
		},
		isActive: false,
	},
	{
		label: __( 'Icon Styles', 'scblocks' ),
		id: 'icon',
		selector: BLOCK_SELECTOR.headingWrapped.icon.alias,
		allowedPanels: {
			colors: {
				iconColor: true,
			},
			space: {
				fontSize: true,
				padding: true,
			},
		},
		isActive: false,
	},
];
