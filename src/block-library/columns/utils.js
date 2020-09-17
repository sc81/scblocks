/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { BLOCK_SELECTOR } from '../../block/constants';
import { PLUGIN_NAME } from '../../constants';

export const COLUMNS_NAME = `${ PLUGIN_NAME }/columns`;

export const selectorsSettings = [
	{
		label: __( 'Columns Style', 'scblocks' ),
		id: BLOCK_SELECTOR.blockMainSelectorAlias,
		selector: BLOCK_SELECTOR.blockMainSelectorAlias,
		allowedPanels: {
			space: true,
			position: {
				alignItems: true,
				flexDirection: true,
			},
		},
	},
];
