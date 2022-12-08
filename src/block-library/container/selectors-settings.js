/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * ScBlocks dependencies
 */
import { SELEKTORY } from '@scblocks/block';

export default function getSelectorsSettings() {
	return [
		{
			label: __( 'Container', 'scblocks' ),
			id: SELEKTORY.container.main.alias,
			selector: SELEKTORY.container.main.alias,
			panels: {
				colors: {
					hasHoverControls: true,
					controls: [
						{
							label: __( 'Text color', 'scblocks' ),
							propName: 'color',
							selector: SELEKTORY.container.main.alias,
						},
						{
							label: __( 'Background color', 'scblocks' ),
							propName: 'backgroundColor',
							selector: SELEKTORY.container.main.alias,
						},
						{
							label: __( 'Border color', 'scblocks' ),
							propName: 'borderColor',
							selector: SELEKTORY.container.main.alias,
						},
						{
							label: __( 'Link color', 'scblocks' ),
							propName: 'color',
							selector: SELEKTORY.container.link.alias,
							hoverSelector: SELEKTORY.container.linkHover.alias,
						},
					],
				},
				typography: {},
				background: {},
				border: {},
				space: {
					controls: {
						margin: true,
						padding: {
							selector: SELEKTORY.container.content.alias,
						},
						combinedMaxWidth: [
							{
								label: __( 'Container max-width', 'scblocks' ),
								selector:
									SELEKTORY.container.mainStronger.alias,
							},
							{
								label: __( 'Content max-width', 'scblocks' ),
								selector: SELEKTORY.container.content.alias,
							},
						],
						minHeight: {
							selector: SELEKTORY.container.content.alias,
						},
					},
				},
				position: {
					controls: {
						combinedZindex: [
							{
								label: __( 'Container z-index', 'scblocks' ),
								selector: SELEKTORY.container.main.alias,
							},
							{
								label: __( 'Content z-index', 'scblocks' ),
								selector: SELEKTORY.container.content.alias,
							},
						],
					},
				},
				shapes: {},
				flex: {
					selector: SELEKTORY.container.content.alias,
					displayAllProps: true,
				},
			},
		},
	];
}
