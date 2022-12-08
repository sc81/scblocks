/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * ScBlocks dependencies
 */
import { SELEKTORY } from '@scblocks/block';
import { PLUGIN_NAME } from '@scblocks/constants';

export const COLUMNS_NAME = `${ PLUGIN_NAME }/columns`;

export default function getSelectorsSettings() {
	return [
		{
			label: __( 'Columns', 'scblocks' ),
			id: SELEKTORY.columns.main.alias,
			panels: {
				space: {
					selector: SELEKTORY.columns.main.alias,
					controls: {
						gap: true,
					},
				},
				position: {
					selector: SELEKTORY.columns.main.alias,
					controls: {
						alignItems: true,
						alignContent: true,
						justifyContent: true,
						flexDirection: true,
						flexWrap: true,
					},
				},
			},
		},
	];
}
