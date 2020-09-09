/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { SELECTORS } from '../../block/constants';
import { PLUGIN_NAME } from '../../constants';

export const COLUMNS_NAME = `${ PLUGIN_NAME }/columns`;

export const selectorsSettings = [
	{
		label: __( 'Columns style', 'scblocks' ),
		id: SELECTORS.blockMainSelectorAlias,
		selector: SELECTORS.blockMainSelectorAlias,
		allowedPanels: {
			border: {
				border: {
					selector: SELECTORS.columns.allColumnsContent.alias,
				},
			},
			space: {
				padding: {
					selector: SELECTORS.columns.allColumnsContent.alias,
				},
			},
			flex: {
				alignItems: true,
				flexDirection: true,
			},
		},
	},
];
