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
			panels: {
				colors: {
					usedSelectors: [
						BLOCK_SELECTOR.container.main.alias,
						BLOCK_SELECTOR.container.link.alias,
						BLOCK_SELECTOR.container.linkHover.alias,
					],
					hasHoverControls: true,
					controls: [
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
							hoverSelector:
								BLOCK_SELECTOR.container.linkHover.alias,
						},
					],
				},
				typography: {
					selector: BLOCK_SELECTOR.container.main.alias,
				},
				background: {
					selector: BLOCK_SELECTOR.container.main.alias,
				},
				border: {
					selector: BLOCK_SELECTOR.container.main.alias,
				},
				space: {
					selector: BLOCK_SELECTOR.container.main.alias,
					usedSelectors: [
						BLOCK_SELECTOR.container.content.alias,
						BLOCK_SELECTOR.container.mainStronger.alias,
						BLOCK_SELECTOR.container.main.alias,
					],
					controls: {
						margin: true,
						padding: {
							selector: BLOCK_SELECTOR.container.content.alias,
						},
						combinedMaxWidth: [
							{
								label: __( 'Container max-width', 'scblocks' ),
								selector:
									BLOCK_SELECTOR.container.mainStronger.alias,
							},
							{
								label: __( 'Content max-width', 'scblocks' ),
								selector:
									BLOCK_SELECTOR.container.content.alias,
							},
						],
						minHeight: {
							selector: BLOCK_SELECTOR.container.content.alias,
						},
					},
				},
				position: {
					selector: BLOCK_SELECTOR.container.main.alias,
					usedSelectors: [
						BLOCK_SELECTOR.container.main.alias,
						BLOCK_SELECTOR.container.content.alias,
					],
					controls: {
						combinedZindex: [
							{
								label: __( 'Container z-index', 'scblocks' ),
								selector: BLOCK_SELECTOR.container.main.alias,
							},
							{
								label: __( 'Content z-index', 'scblocks' ),
								selector:
									BLOCK_SELECTOR.container.content.alias,
							},
						],
					},
				},
				shapes: {},
				flex: {
					selector: BLOCK_SELECTOR.container.content.alias,
					displayAllProps: true,
				},
			},
		},
	];
}
