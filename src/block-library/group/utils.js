/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { PLUGIN_NAME } from '../../constants';

export const GROUP_CLASS = `${ PLUGIN_NAME }-group`;
export const GROUP_INNER_CLASS = `${ PLUGIN_NAME }-group-inner`;
export const GROUP_BG_VIDEO_WRAP_CLASS = `${ PLUGIN_NAME }-bg-video-wrap`;
export const GROUP_BG_VIDEO_CLASS = `${ PLUGIN_NAME }-bg-video`;

export const GROUP_SELECTOR = 'selector';
export const GROUP_HOVER_SELECTOR = GROUP_SELECTOR + ':hover';
export const GROUP_INNER_SELECTOR = `.${ GROUP_INNER_CLASS }`;

export const selectors = [
	{
		label: __( 'Group container' ),
		selector: 'selector',
		allowedPanels: {
			typography: true,
			background: true,
			border: true,
			shapeDividers: true,
			backgroundOverlay: true,
			backgroundVideo: true,
			space: {
				margin: true,
				padding: true,
				maxWidth: {
					units: {
						px: {
							min: 500,
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
			selector: GROUP_INNER_SELECTOR,
			props: [ 'maxWidth', 'alignItems' ],
		},
	},
];
