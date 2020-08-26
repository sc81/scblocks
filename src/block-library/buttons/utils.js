/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { PLUGIN_NAME } from '../../constants';
import { SELECTORS } from '../../block/constants';

export const BUTTONS_BLOCK_NAME = `${ PLUGIN_NAME }/buttons`;

export const selectorsSettings = [
	{
		label: __( 'Buttons style', 'scblocks' ),
		selector: SELECTORS.blockMainSelectorAlias,
		allowedPanels: {
			space: {
				margin: true,
			},
			flex: {
				alignItems: true,
				flexDirection: true,
				justifyContent: true,
			},
		},
	},
];
