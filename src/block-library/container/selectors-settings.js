/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * ScBlocks dependencies
 */
import { BLOCK_SELECTOR } from '@scblocks/block';

export default function getSelectorsSettings() {
	return [
		{
			label: __( 'Container', 'scblocks' ),
			id: BLOCK_SELECTOR.container.main.alias,
			selector: BLOCK_SELECTOR.container.main.alias,
			panels: {
				colors: [
					{
						label: __( 'Text color', 'scblocks' ),
						propName: 'color',
						selector: BLOCK_SELECTOR.container.main.alias,
					},
					{
						label: __( 'Background color', 'scblocks' ),
						propName: 'backgroundColor',
						selector: BLOCK_SELECTOR.container.main.alias,
					},
					{
						label: __( 'Border color', 'scblocks' ),
						propName: 'borderColor',
						selector: BLOCK_SELECTOR.container.main.alias,
					},
					{
						label: __( 'Link color', 'scblocks' ),
						propName: 'color',
						selector: BLOCK_SELECTOR.container.link.alias,
						hoverSelector: BLOCK_SELECTOR.container.linkHover.alias,
					},
				],
				typography: true,
				background: true,
				border: true,
				space: {
					margin: true,
					minHeight: true,
					maxWidth: {
						selector: BLOCK_SELECTOR.container.mainStronger.alias,
					},
				},
				position: {
					zIndex: true,
				},
				shapes: true,
			},
		},
		{
			label: __( 'Content', 'scblocks' ),
			id: BLOCK_SELECTOR.container.content.alias,
			selector: BLOCK_SELECTOR.container.content.alias,
			panels: {
				space: {
					padding: true,
					maxWidth: true,
				},
				position: {
					zIndex: true,
				},
				flex: {
					// items
					displayFlex: true,
					gap: true,
					flexDirection: true,
					flexWrap: true,
					justifyContent: true,
					alignItems: true,
					alignContent: true,
					// self
					alignSelf: true,
					flex: true,
					order: true,
				},
			},
		},
	];
}
