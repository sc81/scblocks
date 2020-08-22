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
import { COLUMNS_NAME } from './utils';

export const name = COLUMNS_NAME;

export const settings = {
	title: __( 'Columns', 'scblocks' ),
	icon,
	category: PLUGIN_NAME,
	description: __(
		'Organize your content with flexible columns.',
		'scblocks'
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
