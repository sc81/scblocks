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
		label: __( 'Heading', 'scblocks' ),
		selector: SELECTORS.blockMainSelectorAlias,
		allowedPanels: {
			colors: true,
			typography: true,
			border: true,
			space: {
				padding: true,
				margin: true,
			},
			flex: {
				flexDirection: true,
			},
		},
	},
	{
		label: __( 'Text', 'scblocks' ),
		selector: SELECTORS.heading.text.alias,
		allowedPanels: {
			colors: true,
		},
	},
	{
		label: __( 'Icon', 'scblocks' ),
		selector: SELECTORS.heading.icon.alias,
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
		relatedSelectorProps: {
			selector: SELECTORS.heading.svg.alias,
			props: [ 'width', 'height' ],
		},
		isActive: false,
	},
];
