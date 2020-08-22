/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { SELECTORS } from '../../block/constants';
import { PLUGIN_NAME } from '../../constants';

export const COLUMNS_NAME = `${ PLUGIN_NAME }/columns`;

export const selectorsSettings = [
	{
		label: __( 'Columns', 'scblocks' ),
		selector: SELECTORS.blockMainSelectorAlias,
		allowedPanels: {
			border: true,
			space: {
				padding: true,
			},
			flex: {
				alignItems: true,
				flexDirection: true,
			},
		},
		relatedSelectorProps: {
			selector: SELECTORS.columns.allColumnsContent.alias,
			props: [ 'padding', 'border' ],
		},
	},
];
