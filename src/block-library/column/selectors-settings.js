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
				colors: {
					textColor: true,
					linkColor: {
						hasHoverControls: true,
						selector: BLOCK_SELECTOR.column.link.alias,
						hoverSelector: BLOCK_SELECTOR.column.linkHover.alias,
					},
					backgroundColor: true,
					borderColor: true,
				},
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
