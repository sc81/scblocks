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
				colors: {
					textColor: true,
					backgroundColor: true,
					borderColor: true,
					linkColor: {
						hasHoverControls: true,
						selector: BLOCK_SELECTOR.heading.link.alias,
						hoverSelector: BLOCK_SELECTOR.heading.linkHover.alias,
					},
					highlightText: {
						selector: BLOCK_SELECTOR.heading.highlightText.alias,
					},
				},
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
					colors: {
						iconColor: true,
					},
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
	'scblocks',
	useToggleIconControls
);
