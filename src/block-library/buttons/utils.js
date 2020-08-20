/**
 * Internal dependencies
 */
import { PLUGIN_NAME } from '../../constants';
import { SELECTORS } from '../../block/constants';

export const BUTTONS_BLOCK_NAME = `${ PLUGIN_NAME }/buttons`;

export const selectorsSettings = [
	{
		label: 'Buttons',
		selector: SELECTORS.blockMainSelectorAlias,
		allowedPanels: {
			typography: true,
			background: true,
			border: true,
			space: {
				margin: true,
				padding: true,
			},
		},
	},
];
