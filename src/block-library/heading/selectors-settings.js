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
			label: __( 'Heading', 'scblocks' ),
			id: SELEKTORY.heading.main.alias,
			selector: SELEKTORY.heading.main.alias,
			panels: {
				colors: {
					usedSelectors: [
						SELEKTORY.heading.main.alias,
						SELEKTORY.heading.link.alias,
						SELEKTORY.heading.linkHover.alias,
						SELEKTORY.heading.highlightText.alias,
					],
					hasHoverControls: true,
					controls: [
						{
							label: __( 'Text color', 'scblocks' ),
							propName: 'color',
							selector: SELEKTORY.heading.main.alias,
						},
						{
							label: __( 'Background color', 'scblocks' ),
							propName: 'backgroundColor',
							selector: SELEKTORY.heading.main.alias,
						},
						{
							label: __( 'Border color', 'scblocks' ),
							propName: 'borderColor',
							selector: SELEKTORY.heading.main.alias,
						},
						{
							label: __( 'Link color', 'scblocks' ),
							propName: 'color',
							selector: SELEKTORY.heading.link.alias,
							hoverSelector: SELEKTORY.heading.linkHover.alias,
						},
						{
							label: __( 'Highlight text', 'scblocks' ),
							propName: 'color',
							selector: SELEKTORY.heading.highlightText.alias,
						},
					],
				},
				typography: {},
				border: {},
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
			id: SELEKTORY.heading.icon.alias,
			selector: SELEKTORY.heading.icon.alias,
			panels: {
				colors: {
					controls: [
						{
							label: __( 'Icon color', 'scblocks' ),
							propName: 'color',
							selector: SELEKTORY.heading.icon.alias,
						},
					],
				},
				space: {
					controls: {
						width: {
							selector: SELEKTORY.heading.iconSvg.alias,
						},
						height: {
							selector: SELEKTORY.heading.iconSvg.alias,
						},
						padding: true,
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
			SELEKTORY.heading.icon.alias,
			true
		);
	}
	return setSelectorActivity( settings, SELEKTORY.heading.icon.alias, false );
}
addFilter(
	'scblocks.heading.selectorsSettings',
	'scblocks/heading/toggleIconControls',
	toggleIconControls,
	10
);
