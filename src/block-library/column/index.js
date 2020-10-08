/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import edit from './edit';
import save from './save';
import { PLUGIN_NAME } from '../../constants';
import { COLUMN_NAME } from './utils';
import { SHARED_ATTRIBUTES } from '../../block/shared-attributes';
import icon from './icon';

export const name = COLUMN_NAME;

export const settings = {
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
		lightBlockWrapper: true,
		customClassName: false,
	},
	edit,
	save,
};
