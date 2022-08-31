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
			panels: {
				colors: {
					usedSelectors: [
						BLOCK_SELECTOR.button.main.alias,
						BLOCK_SELECTOR.button.mainHover.alias,
					],
					hasHoverControls: true,
					controls: [
						{
							label: __( 'Text color', 'scblocks' ),
							propName: 'color',
							selector: BLOCK_SELECTOR.button.main.alias,
							hoverSelector:
								BLOCK_SELECTOR.button.mainHover.alias,
						},
						{
							label: __( 'Background color', 'scblocks' ),
							propName: 'backgroundColor',
							selector: BLOCK_SELECTOR.button.main.alias,
							hoverSelector:
								BLOCK_SELECTOR.button.mainHover.alias,
						},
						{
							label: __( 'Border color', 'scblocks' ),
							propName: 'borderColor',
							selector: BLOCK_SELECTOR.button.main.alias,
							hoverSelector:
								BLOCK_SELECTOR.button.mainHover.alias,
						},
					],
				},
				typography: {
					selector: BLOCK_SELECTOR.button.main.alias,
				},
				border: {
					hasHoverControls: true,
					selector: BLOCK_SELECTOR.button.main.alias,
					hoverSelector: BLOCK_SELECTOR.button.mainHover.alias,
				},
				space: {
					selector: BLOCK_SELECTOR.button.main.alias,
					controls: {
						padding: true,
						margin: true,
					},
				},
				flex: {
					selector: BLOCK_SELECTOR.button.main.alias,
					displayAllProps: true,
				},
			},
		},
		{
			label: __( 'Icon', 'scblocks' ),
			id: BLOCK_SELECTOR.button.icon.alias,
			isActive: false,
			panels: {
				space: {
					selector: BLOCK_SELECTOR.button.icon.alias,
					controls: {
						padding: true,
						width: {
							selector: BLOCK_SELECTOR.button.iconSvg.alias,
						},
						height: {
							selector: BLOCK_SELECTOR.button.iconSvg.alias,
						},
					},
				},
			},
		},
	];
}

function toggleIconControls( settings, { attributes: { icon } } ) {
	if ( icon ) {
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
