/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { SELECTORS } from '../../block/constants';

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
