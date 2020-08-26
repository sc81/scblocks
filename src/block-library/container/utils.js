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
		label: __( 'Container style', 'scblocks' ),
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
				maxWidth: {
					units: {
						px: {
							min: 50,
							max: 1600,
						},
						'%': {
							min: 10,
						},
						vh: true,
						vw: true,
					},
					selector: SELECTORS.container.content.alias,
				},
				minHeight: true,
			},
		},
	},
];
