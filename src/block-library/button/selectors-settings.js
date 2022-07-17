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
			label: __( 'Button', 'scblocks' ),
			id: BLOCK_SELECTOR.button.main.alias,
			selector: BLOCK_SELECTOR.button.main.alias,
			hoverSelector: BLOCK_SELECTOR.button.mainHover.alias,
			panels: {
				colors: [
					{
						label: __( 'Text color', 'scblocks' ),
						propName: 'color',
						selector: BLOCK_SELECTOR.button.main.alias,
						hoverSelector: BLOCK_SELECTOR.button.mainHover.alias,
					},
					{
						label: __( 'Background color', 'scblocks' ),
						propName: 'backgroundColor',
						selector: BLOCK_SELECTOR.button.main.alias,
						hoverSelector: BLOCK_SELECTOR.button.mainHover.alias,
					},
					{
						label: __( 'Border color', 'scblocks' ),
						propName: 'borderColor',
						selector: BLOCK_SELECTOR.button.main.alias,
						hoverSelector: BLOCK_SELECTOR.button.mainHover.alias,
					},
				],
				typography: true,
				border: {
					hasHoverControls: true,
				},
				space: {
					padding: true,
					margin: true,
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
		{
			label: __( 'Icon', 'scblocks' ),
			id: BLOCK_SELECTOR.button.icon.alias,
			selector: BLOCK_SELECTOR.button.icon.alias,
			isActive: false,
			panels: {
				space: {
					padding: true,
					fontSize: true, // icon size
				},
			},
		},
	];
}

function toggleIconControls( settings, { attributes: { iconId } } ) {
	if ( iconId ) {
		return setSelectorActivity(
			settings,
			BLOCK_SELECTOR.button.icon.alias,
			true
		);
	}
	return setSelectorActivity(
		settings,
		BLOCK_SELECTOR.button.icon.alias,
		false
	);
}

addFilter(
	'scblocks.button.selectorsSettings',
	'scblocks/button/toggleIconControls',
	toggleIconControls,
	10
);
