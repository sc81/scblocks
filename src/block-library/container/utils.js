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
		label: __( 'Container', 'scblocks' ),
		selector: SELECTORS.blockMainSelectorAlias,
		allowedPanels: {
			typography: true,
			background: true,
			border: true,
			backgroundOverlay: true,
			backgroundVideo: true,
			space: {
				margin: true,
				padding: true,
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
				},
				minHeight: true,
			},
		},
		relatedSelectorProps: {
			selector: SELECTORS.container.content.alias,
			props: [ 'maxWidth', 'padding' ],
		},
	},
];
