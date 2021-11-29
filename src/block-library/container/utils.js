/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { applyFilters } from '@wordpress/hooks';

/**
 * ScBlocks dependencies
 */
import { BLOCK_SELECTOR } from '@scblocks/block';

export default function getContainerSelectorsSettings() {
	return applyFilters(
		'scblocks.container.selectorsSettings',
		[
			{
				label: __( 'Container Style', 'scblocks' ),
				id: BLOCK_SELECTOR.container.main.alias,
				selector: BLOCK_SELECTOR.container.main.alias,
				allowedPanels: {
					colors: {
						textColor: true,
						linkColor: {
							hasHoverControls: true,
							selector: BLOCK_SELECTOR.container.link.alias,
							hoverSelector:
								BLOCK_SELECTOR.container.linkHover.alias,
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
					shapes: true,
				},
			},
		],
		BLOCK_SELECTOR
	);
}
