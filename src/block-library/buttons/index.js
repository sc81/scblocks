/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { button as icon } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import { PLUGIN_NAME } from '../../constants';

import save from './save';
import edit from './edit';

export const name = `${ PLUGIN_NAME }/buttons`;

export const settings = {
	title: __( 'Buttons' ),
	description: __(
		'Prompt visitors to take action with a group of button-style links.'
	),
	icon,
	category: PLUGIN_NAME,
	keywords: [ __( 'link' ) ],
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
		alignWide: false,
		className: false,
		lightBlockWrapper: true,
	},
	edit,
	save,
};
