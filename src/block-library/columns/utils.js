/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { SELECTORS } from '../../block/constants';
import { PLUGIN_NAME } from '../../constants';

export const COLUMNS_NAME = `${ PLUGIN_NAME }/columns`;

export const selectorsSettings = [
	{
		label: __( 'Columns Style', 'scblocks' ),
		id: SELECTORS.blockMainSelectorAlias,
		selector: SELECTORS.blockMainSelectorAlias,
		allowedPanels: {
			space: true,
			flex: {
				alignItems: true,
				flexDirection: true,
			},
		},
	},
];
