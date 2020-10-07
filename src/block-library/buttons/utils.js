/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { PLUGIN_NAME } from '../../constants';
import { BLOCK_SELECTOR } from '../../block/constants';

export const BUTTONS_BLOCK_NAME = `${ PLUGIN_NAME }/buttons`;

export const BUTTONS_SELECTORS_SETTINGS = [
	{
		label: __( 'Buttons style', 'scblocks' ),
		id: BLOCK_SELECTOR.buttons.main.alias,
		selector: BLOCK_SELECTOR.buttons.main.alias,
		allowedPanels: {
			space: {
				margin: true,
			},
			position: {
				alignItems: true,
				flexDirection: true,
				justifyContent: true,
			},
		},
	},
];
