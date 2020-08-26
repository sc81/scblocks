/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { PLUGIN_NAME } from '../../constants';
import { SELECTORS } from '../../block/constants';

export const BUTTON_BLOCK_NAME = `${ PLUGIN_NAME }/button`;

export const selectorsSettings = [
	{
		label: __( 'Button style', 'scblocks' ),
		selector: SELECTORS.blockMainSelectorAlias,
		hoverSelector: SELECTORS.blockMainSelectorHoverAlias,
		allowedPanels: {
			colors: {
				textColor: {
					hasHoverControls: true,
				},
				backgroundColor: {
					hasHoverControls: true,
				},
				borderColor: {
					hasHoverControls: true,
				},
			},
			typography: true,
			border: {
				hasHoverControls: true,
			},
			space: {
				padding: true,
				margin: true,
			},
			flex: {
				flexGrow: true,
				flexDirection: true,
			},
		},
	},
	{
		label: __( 'Icon style', 'scblocks' ),
		selector: SELECTORS.button.icon.alias,
		allowedPanels: {
			space: {
				padding: true,
				fontSize: true, // icon size
			},
		},
		isActive: false,
	},
];
