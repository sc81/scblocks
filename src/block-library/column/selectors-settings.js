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
			label: __( 'Column', 'scblocks' ),
			id: SELEKTORY.column.main.alias,
			selector: SELEKTORY.column.main.alias,
			panels: {
				typography: {},
				colors: {
					hasHoverControls: true,
					controls: [
						{
							label: __( 'Text color', 'scblocks' ),
							propName: 'color',
							selector: SELEKTORY.column.main.alias,
						},
						{
							label: __( 'Background color', 'scblocks' ),
							propName: 'backgroundColor',
							selector: SELEKTORY.column.main.alias,
						},
						{
							label: __( 'Border color', 'scblocks' ),
							propName: 'borderColor',
							selector: SELEKTORY.column.main.alias,
						},
						{
							label: __( 'Link color', 'scblocks' ),
							propName: 'color',
							selector: SELEKTORY.column.link.alias,
							hoverSelector: SELEKTORY.column.linkHover.alias,
						},
					],
				},
				background: {},
				border: {},
				space: {
					controls: {
						margin: true,
						padding: true,
						minHeight: true,
					},
				},
				position: {
					controls: {
						zIndex: true,
					},
				},
				flex: {
					displayAllProps: true,
				},
			},
		},
	];
}
