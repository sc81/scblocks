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
				typography: true,
				colors: [
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
						hoverSelector: BLOCK_SELECTOR.column.linkHover.alias,
					},
				],
				background: true,
				border: true,
				space: {
					margin: true,
					padding: true,
					minHeight: true,
					flex: true,
				},
				position: {
					order: true,
					zIndex: true,
					alignSelf: true,
				},
				flex: {
					selector: BLOCK_SELECTOR.column.main.alias,
					props: {
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
		},
	];
}
