/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { SELECTORS } from '../../block/constants';

export const selectorsSettings = [
	{
		label: __( 'Container Style', 'scblocks' ),
		id: SELECTORS.blockMainSelectorAlias,
		selector: SELECTORS.blockMainSelectorAlias,
		allowedPanels: {
			typography: true,
			background: true,
			border: true,
			space: {
				margin: true,
				padding: {
					selector: SELECTORS.container.content.alias,
				},
				minHeight: true,
			},
			position: {
				zIndex: true,
			},
		},
	},
];
