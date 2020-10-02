/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { BLOCK_SELECTOR } from '../../block/constants';

export const CONTAINER_SELECTORS_SETTINGS = [
	{
		label: __( 'Container Style', 'scblocks' ),
		id: BLOCK_SELECTOR.blockMainSelectorAlias,
		selector: BLOCK_SELECTOR.blockMainSelectorAlias,
		allowedPanels: {
			colors: {
				textColor: true,
				linkColor: {
					hasHoverControls: true,
					selector: BLOCK_SELECTOR.container.link.alias,
					hoverSelector: BLOCK_SELECTOR.container.linkHover.alias,
				},
				backgroundColor: true,
				borderColor: true,
			},
			typography: true,
			background: true,
			border: true,
			space: {
				margin: true,
				padding: {
					selector: BLOCK_SELECTOR.container.content.alias,
				},
				minHeight: true,
			},
			position: {
				zIndex: true,
			},
		},
	},
];
