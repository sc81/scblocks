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
		label: __( 'Heading Styles', 'scblocks' ),
		id: 'heading',
		selector: SELECTORS.blockMainSelectorAlias,
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
		selector: SELECTORS.blockMainSelectorAlias,
		allowedPanels: {
			colors: {
				textColor: true,
				backgroundColor: true,
				borderColor: true,
				linkColor: {
					hasHoverControls: true,
					selector: SELECTORS.headingWrapped.link.alias,
					hoverSelector: SELECTORS.headingWrapped.linkHover.alias,
				},
				highlightText: {
					selector: SELECTORS.headingWrapped.highlightText.alias,
				},
			},
			typography: {
				selector: SELECTORS.headingWrapped.text.alias,
			},
			border: true,
			space: {
				padding: true,
				margin: true,
			},
			flex: {
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
		selector: SELECTORS.headingWrapped.icon.alias,
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
