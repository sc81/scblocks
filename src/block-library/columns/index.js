/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { columns as icon } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import { PLUGIN_NAME } from '../../constants';
import save from './save';
import edit from './edit';
import { variations } from './variations';

export const name = `${ PLUGIN_NAME }/columns`;

export const settings = {
	title: __( 'Columns' ),
	icon,
	category: PLUGIN_NAME,
	description: __(
		'Add a block that displays content in multiple columns, then add whatever content blocks you’d like.'
	),
	attributes: {
		css: {
			type: 'object',
			default: {},
		},
		uidClass: {
			type: 'string',
			default: '',
		},
	},
	supports: {
		html: false,
		className: false,
		lightBlockWrapper: true,
		align: [ 'wide', 'full' ],
	},
	edit,
	save,
	variations,
};
