/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * ScBlocks dependencies
 */
import { SHARED_ATTRIBUTES } from '@scblocks/block';
import { PLUGIN_NAME } from '@scblocks/constants';

/**
 * Internal dependencies
 */
import edit from './edit';
import save from './save';
import { COLUMN_NAME } from './utils';
import icon from './icon';

export const name = COLUMN_NAME;

export const settings = {
	apiVersion: 2,
	title: __( 'Column', 'scblocks' ),
	parent: [ `${ PLUGIN_NAME }/columns` ],
	description: __( 'A single column within a columns block.', 'scblocks' ),
	category: PLUGIN_NAME,
	icon,
	attributes: {
		...SHARED_ATTRIBUTES.required,
		...SHARED_ATTRIBUTES.id,
		...SHARED_ATTRIBUTES.classes,
		...SHARED_ATTRIBUTES.bgImageIds,
		tag: {
			type: 'string',
			default: 'div',
		},
		...SHARED_ATTRIBUTES.googleFonts,
	},
	supports: {
		inserter: false,
		reusable: false,
		html: false,
		className: false,
		customClassName: false,
	},
	edit,
	save,
};
