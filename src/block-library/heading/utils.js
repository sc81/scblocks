/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { PLUGIN_NAME } from '../../constants';

export const HEADING_CLASS = `${ PLUGIN_NAME }-heading`;
export const HEADING_ICON_CLASS = `${ PLUGIN_NAME }-heading-icon`;
export const HEADING_TEXT_CLASS = `${ PLUGIN_NAME }-heading-text`;

export const HEADING_SELECTOR = 'selector';
export const HEADING_TEXT_SELECTOR = `.${ HEADING_TEXT_CLASS }`;
export const HEADING_ICON_SELECTOR = `.${ HEADING_ICON_CLASS }`;

export const selectors = [
	{
		label: __( 'Heading' ),
		selector: HEADING_SELECTOR,
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
		label: __( 'Text' ),
		selector: HEADING_TEXT_SELECTOR,
		allowedPanels: {
			colors: true,
		},
	},
	{
		label: __( 'Icon' ),
		selector: HEADING_ICON_SELECTOR,
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
			selector: `${ HEADING_ICON_SELECTOR } svg`,
			props: [ 'width', 'height' ],
		},
		isActive: false,
	},
];
