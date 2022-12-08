/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * ScBlocks dependencies
 */
import { SELEKTORY } from '@scblocks/block';
import { PLUGIN_NAME } from '@scblocks/constants';

export const BUTTONS_BLOCK_NAME = `${ PLUGIN_NAME }/buttons`;

export default function getSelectorsSettings() {
	return [
		{
			label: __( 'Buttons style', 'scblocks' ),
			id: SELEKTORY.buttons.main.alias,
			panels: {
				space: {
					selector: SELEKTORY.buttons.main.alias,
					controls: {
						margin: true,
					},
				},
				position: {
					selector: SELEKTORY.buttons.main.alias,
					controls: {
						alignItems: true,
						flexDirection: true,
						justifyContent: true,
					},
				},
			},
		},
	];
}
