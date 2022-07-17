/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { addAction } from '@wordpress/hooks';
import { useEffect } from '@wordpress/element';

/**
 * ScBlocks dependencies
 */
import { BLOCK_SELECTOR } from '@scblocks/block';

export const HEADING_BLOCK_NAME = 'scblocks/heading';

export default function getSelectorsSettings() {
	return [
		{
			label: __( 'Heading', 'scblocks' ),
			id: BLOCK_SELECTOR.heading.main.alias,
			selector: BLOCK_SELECTOR.heading.main.alias,
			allowedPanels: {
				colors: [
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
						hoverSelector: BLOCK_SELECTOR.heading.linkHover.alias,
					},
					{
						label: __( 'Highlight text', 'scblocks' ),
						propName: 'color',
						selector: BLOCK_SELECTOR.heading.highlightText.alias,
					},
				],
				typography: true,
				border: true,
				space: {
					padding: true,
					margin: true,
				},
				position: {
					flexDirection: true,
					alignItems: true,
					justifyContent: true,
				},
			},
		},
	];
}

function useToggleIconControls(
	settings,
	{ setSettings, addSelectorSettings, removeSelectorSettings },
	{ attributes: { iconId } }
) {
	useEffect( () => {
		let nextSettings;
		if ( iconId ) {
			nextSettings = addSelectorSettings( settings, {
				label: __( 'Icon', 'scblocks' ),
				id: BLOCK_SELECTOR.heading.icon.alias,
				selector: BLOCK_SELECTOR.heading.icon.alias,
				allowedPanels: {
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
			} );
		} else {
			nextSettings = removeSelectorSettings(
				settings,
				BLOCK_SELECTOR.heading.icon.alias
			);
		}
		setSettings( nextSettings );
	}, [ iconId ] );
}

addAction(
	'scblocks.heading.selectorsSettings',
	'scblocks/heading/useToggleIconControls',
	useToggleIconControls,
	10
);
