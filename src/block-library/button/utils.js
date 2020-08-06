/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { PLUGIN_NAME } from '../../constants';

export const BUTTON_BLOCK_NAME = `${ PLUGIN_NAME }/button`;

export const BUTTON_CLASS = `${ PLUGIN_NAME }-button`;
export const BUTTON_LINK_CLASS = `${ PLUGIN_NAME }-button-link`;
export const BUTTON_TEXT_CLASS = `${ PLUGIN_NAME }-button-text`;
export const BUTTON_ICON_CLASS = `${ PLUGIN_NAME }-button-icon`;

export const BUTTON_SELECTOR = 'selector';
export const BUTTON_LINK_SELECTOR = `.${ BUTTON_LINK_CLASS }`;
export const BUTTON_TEXT_SELECTOR = `.${ BUTTON_TEXT_CLASS }`;
export const BUTTON_ICON_SELECTOR = `.${ BUTTON_ICON_CLASS }`;

export const selectors = [
	{
		label: __( 'Button' ),
		selector: BUTTON_LINK_SELECTOR,
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
			selector: BUTTON_SELECTOR,
			props: [ 'margin', 'flexGrow' ],
		},
	},
	{
		label: __( 'Icon' ),
		selector: BUTTON_ICON_SELECTOR,
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
