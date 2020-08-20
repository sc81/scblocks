/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { PLUGIN_NAME } from '../../constants';
import { SELECTORS } from '../../block/constants';

export const BUTTON_BLOCK_NAME = `${ PLUGIN_NAME }/button`;

export const selectorsSettings = [
	{
		label: __( 'Button', 'scblocks' ),
		selector: SELECTORS.button.link.alias,
		allowedPanels: {
			background: true,
			typography: true,
			border: true,
			space: {
				padding: true,
				margin: true,
			},
			flex: {
				flexGrow: true,
				flexDirection: true,
			},
		},
		relatedSelectorProps: {
			selector: SELECTORS.blockMainSelectorAlias,
			props: [ 'margin', 'flexGrow' ],
		},
	},
	{
		label: __( 'Icon', 'scblocks' ),
		selector: SELECTORS.button.icon.alias,
		allowedPanels: {
			colors: true,
			space: {
				padding: true,
				margin: true,
				width: {
					units: {
						px: {
							min: 10,
							max: 100,
						},
					},
				},
				height: {
					units: {
						px: {
							min: 10,
							max: 100,
						},
					},
				},
			},
		},
		isActive: false,
	},
];
