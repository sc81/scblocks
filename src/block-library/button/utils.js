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
import { PLUGIN_NAME } from '@scblocks/constants';

export const BUTTON_BLOCK_NAME = `${ PLUGIN_NAME }/button`;

export default function getSelectorsSettings() {
	return [
		{
			label: __( 'Button', 'scblocks' ),
			id: BLOCK_SELECTOR.button.main.alias,
			selector: BLOCK_SELECTOR.button.main.alias,
			hoverSelector: BLOCK_SELECTOR.button.mainHover.alias,
			allowedPanels: {
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
				id: BLOCK_SELECTOR.button.icon.alias,
				selector: BLOCK_SELECTOR.button.icon.alias,
				allowedPanels: {
					space: {
						padding: true,
						fontSize: true, // icon size
					},
				},
			} );
		} else {
			nextSettings = removeSelectorSettings(
				settings,
				BLOCK_SELECTOR.button.icon.alias
			);
		}
		setSettings( nextSettings );
	}, [ iconId ] );
}

addAction(
	'scblocks.button.selectorsSettings',
	'scblocks/button/useToggleIconControls',
	useToggleIconControls,
	10
);
