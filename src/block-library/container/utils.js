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

export default function getSelectorsSettings() {
	return [
		{
			label: __( 'Container', 'scblocks' ),
			id: BLOCK_SELECTOR.container.main.alias,
			selector: BLOCK_SELECTOR.container.main.alias,
			allowedPanels: {
				colors: {
					textColor: true,
					linkColor: {
						hasHoverControls: true,
						selector: BLOCK_SELECTOR.container.link.alias,
						hoverSelector: BLOCK_SELECTOR.container.linkHover.alias,
					},
					backgroundColor: true,
					borderColor: true,
				},
				typography: true,
				background: true,
				border: true,
				space: {
					margin: true,
					minHeight: true,
					maxWidth: {
						selector: BLOCK_SELECTOR.container.mainStronger.alias,
					},
				},
				position: {
					zIndex: true,
				},
				shapes: true,
			},
		},
		{
			label: __( 'Content', 'scblocks' ),
			id: BLOCK_SELECTOR.container.content.alias,
			selector: BLOCK_SELECTOR.container.content.alias,
			allowedPanels: {
				space: {
					padding: true,
					maxWidth: true,
				},
				position: {
					zIndex: true,
				},
			},
		},
	];
}

function useToggleGridControls(
	settings,
	{ setSettings, setSelectorAllowedPanels },
	{ attributes: { isGridItem } }
) {
	useEffect( () => {
		let nextSettings;
		if ( isGridItem ) {
			nextSettings = setSelectorAllowedPanels(
				settings,
				BLOCK_SELECTOR.container.main.alias,
				( currentAllowedPanels ) => {
					currentAllowedPanels.grid = {
						gridColumn: true,
						gridRow: true,
						gridArea: true,
						justifySelf: true,
						alignSelf: true,
						order: true,
					};
					return currentAllowedPanels;
				}
			);
		} else {
			nextSettings = setSelectorAllowedPanels(
				settings,
				BLOCK_SELECTOR.container.main.alias,
				( currentAllowedPanels ) => {
					delete currentAllowedPanels.grid;
					return currentAllowedPanels;
				}
			);
		}
		setSettings( nextSettings );
	}, [ isGridItem ] );
}

addAction(
	'scblocks.container.selectorsSettings',
	'scblocks',
	useToggleGridControls
);
