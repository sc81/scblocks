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
			label: __( 'Column', 'scblocks' ),
			id: BLOCK_SELECTOR.column.main.alias,
			selector: BLOCK_SELECTOR.column.main.alias,
			panels: {
				typography: {},
				colors: {
					hasHoverControls: true,
					controls: [
						{
							label: __( 'Text color', 'scblocks' ),
							propName: 'color',
							selector: BLOCK_SELECTOR.column.main.alias,
						},
						{
							label: __( 'Background color', 'scblocks' ),
							propName: 'backgroundColor',
							selector: BLOCK_SELECTOR.column.main.alias,
						},
						{
							label: __( 'Border color', 'scblocks' ),
							propName: 'borderColor',
							selector: BLOCK_SELECTOR.column.main.alias,
						},
						{
							label: __( 'Link color', 'scblocks' ),
							propName: 'color',
							selector: BLOCK_SELECTOR.column.link.alias,
							hoverSelector:
								BLOCK_SELECTOR.column.linkHover.alias,
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
