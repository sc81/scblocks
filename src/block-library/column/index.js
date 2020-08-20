/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { column as icon } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import edit from './edit';
import save from './save';
import { PLUGIN_NAME } from '../../constants';
import { COLUMN_NAME } from './utils';

export const name = COLUMN_NAME;

export const settings = {
	title: __( 'Column', 'scblocks' ),
	parent: [ `${ PLUGIN_NAME }/columns` ],
	description: __( 'A single column within a columns block.', 'scblocks' ),
	category: PLUGIN_NAME,
	icon,
	attributes: {
		css: {
			type: 'object',
			default: {},
		},
		uidClass: {
			type: 'string',
			default: '',
		},
		tag: {
			type: 'string',
		},
	},
	supports: {
		inserter: false,
		reusable: false,
		html: false,
		className: false,
		lightBlockWrapper: true,
	},
	edit,
	save,
};
