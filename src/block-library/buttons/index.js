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
import variations from './variations';
import { BUTTONS_BLOCK_NAME } from './utils';

export const name = BUTTONS_BLOCK_NAME;

export const settings = {
	title: __( 'Buttons', 'scblocks' ),
	description: __(
		'Prompt visitors to take action with a group of button-style links.'
	),
	icon,
	category: PLUGIN_NAME,
	keywords: [ __( 'link', 'scblocks' ) ],
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
	variations,
};
