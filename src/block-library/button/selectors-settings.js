/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';

/**
 * ScBlocks dependencies
 */
import { SELEKTORY, setSelectorActivity } from '@scblocks/block';

export default function getSelectorsSettings() {
	return [
		{
			label: __( 'Button', 'scblocks' ),
			id: SELEKTORY.button.main.alias,
			selector: SELEKTORY.button.main.alias,
			hoverSelector: SELEKTORY.button.mainHover.alias,
			panels: {
				colors: {
					hasHoverControls: true,
					controls: [
						{
							label: __( 'Text color', 'scblocks' ),
							propName: 'color',
							selector: SELEKTORY.button.main.alias,
							hoverSelector: SELEKTORY.button.mainHover.alias,
						},
						{
							label: __( 'Background color', 'scblocks' ),
							propName: 'backgroundColor',
							selector: SELEKTORY.button.main.alias,
							hoverSelector: SELEKTORY.button.mainHover.alias,
						},
						{
							label: __( 'Border color', 'scblocks' ),
							propName: 'borderColor',
							selector: SELEKTORY.button.main.alias,
							hoverSelector: SELEKTORY.button.mainHover.alias,
						},
					],
				},
				typography: {},
				border: {
					hasHoverControls: true,
				},
				space: {
					controls: {
						padding: true,
						margin: true,
					},
				},
				flex: {
					displayAllProps: true,
				},
			},
		},
		{
			label: __( 'Icon', 'scblocks' ),
			id: SELEKTORY.button.icon.alias,
			isActive: false,
			selector: SELEKTORY.button.icon.alias,
			panels: {
				space: {
					controls: {
						padding: true,
						width: {
							selector: SELEKTORY.button.iconSvg.alias,
						},
						height: {
							selector: SELEKTORY.button.iconSvg.alias,
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
			SELEKTORY.button.icon.alias,
			true
		);
	}
	return setSelectorActivity( settings, SELEKTORY.button.icon.alias, false );
}

addFilter(
	'scblocks.button.selectorsSettings',
	'scblocks/button/toggleIconControls',
	toggleIconControls,
	10
);
