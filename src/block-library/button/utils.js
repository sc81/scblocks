/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { PLUGIN_NAME } from '../../constants';
import { BLOCK_SELECTOR } from '../../block/constants';

export const BUTTON_BLOCK_NAME = `${ PLUGIN_NAME }/button`;

export const selectorsSettings = [
	{
		label: __( 'Button style', 'scblocks' ),
		id: BLOCK_SELECTOR.blockMainSelectorAlias,
		selector: BLOCK_SELECTOR.blockMainSelectorAlias,
		hoverSelector: BLOCK_SELECTOR.blockMainSelectorHoverAlias,
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
		id: BLOCK_SELECTOR.button.icon.alias,
		selector: BLOCK_SELECTOR.button.icon.alias,
		allowedPanels: {
			space: {
				padding: true,
				fontSize: true, // icon size
			},
		},
		isActive: false,
	},
];
