/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';

/**
 * ScBlocks dependencies
 */
import { BLOCK_SELECTOR, setSelectorActivity } from '@scblocks/block';

export default function getSelectorsSettings() {
	return [
		{
			label: __( 'Heading', 'scblocks' ),
			id: BLOCK_SELECTOR.heading.main.alias,
			selector: BLOCK_SELECTOR.heading.main.alias,
			panels: {
				colors: {
					usedSelectors: [
						BLOCK_SELECTOR.heading.main.alias,
						BLOCK_SELECTOR.heading.link.alias,
						BLOCK_SELECTOR.heading.linkHover.alias,
						BLOCK_SELECTOR.heading.highlightText.alias,
					],
					hasHoverControls: true,
					controls: [
						{
							label: __( 'Text color', 'scblocks' ),
							propName: 'color',
							selector: BLOCK_SELECTOR.heading.main.alias,
						},
						{
							label: __( 'Background color', 'scblocks' ),
							propName: 'backgroundColor',
							selector: BLOCK_SELECTOR.heading.main.alias,
						},
						{
							label: __( 'Border color', 'scblocks' ),
							propName: 'borderColor',
							selector: BLOCK_SELECTOR.heading.main.alias,
						},
						{
							label: __( 'Link color', 'scblocks' ),
							propName: 'color',
							selector: BLOCK_SELECTOR.heading.link.alias,
							hoverSelector:
								BLOCK_SELECTOR.heading.linkHover.alias,
						},
						{
							label: __( 'Highlight text', 'scblocks' ),
							propName: 'color',
							selector:
								BLOCK_SELECTOR.heading.highlightText.alias,
						},
					],
				},
				typography: true,
				border: true,
				space: {
					padding: true,
					margin: true,
				},
				flex: {
					selector: BLOCK_SELECTOR.heading.main.alias,
					displayAllProps: true,
					hasItemsHeading: true,
				},
			},
		},
		{
			label: __( 'Icon', 'scblocks' ),
			id: BLOCK_SELECTOR.heading.icon.alias,
			selector: BLOCK_SELECTOR.heading.icon.alias,
			panels: {
				colors: [
					{
						label: __( 'Icon color', 'scblocks' ),
						propName: 'color',
						selector: BLOCK_SELECTOR.heading.icon.alias,
					},
				],
				space: {
					fontSize: true,
					padding: true,
				},
			},
		},
	];
}
function toggleIconControls( settings, { attributes: { iconId } } ) {
	if ( iconId ) {
		return setSelectorActivity(
			settings,
			BLOCK_SELECTOR.heading.icon.alias,
			true
		);
	}
	return setSelectorActivity(
		settings,
		BLOCK_SELECTOR.heading.icon.alias,
		false
	);
}
addFilter(
	'scblocks.heading.selectorsSettings',
	'scblocks/heading/toggleIconControls',
	toggleIconControls,
	10
);
