/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { PLUGIN_NAME } from '../../constants';
import { SELECTORS } from '../../block/constants';

export const COLUMN_NAME = `${ PLUGIN_NAME }/column`;

export const selectorsSettings = [
	{
		label: __( 'Column', 'scblocks' ),
		selector: SELECTORS.column.content.alias,
		allowedPanels: {
			colors: {
				textColor: {
					selector: SELECTORS.column.content.alias,
				},
				linkColor: {
					selector: SELECTORS.column.link.alias,
				},
				linkColorHover: {
					selector: SELECTORS.column.linkHover.alias,
				},
			},
			background: true,
			border: true,
			space: {
				margin: true,
				padding: true,
				width: {
					units: {
						'%': {
							min: 10,
							max: 100,
						},
					},
				},
				minHeight: true,
			},
			flex: {
				alignItems: true,
				flexDirection: true,
				justifyContent: true,
			},
		},
		relatedSelectorProps: {
			selector: SELECTORS.blockMainSelectorAlias,
			props: [ 'width' ],
		},
	},
];
