/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { button as icon } from '@wordpress/icons';

/**
 * Internal dependencies
 */

import {
	BUTTON_TEXT_SELECTOR,
	BUTTON_LINK_SELECTOR,
	BUTTON_ICON_SELECTOR,
	BUTTON_BLOCK_NAME,
} from './utils';
import { PLUGIN_NAME } from '../../constants';

import save from './save';
import edit from './edit';
import { BUTTONS_BLOCK_NAME } from '../buttons/utils';

export const name = BUTTON_BLOCK_NAME;

export const settings = {
	title: __( 'Button' ),
	description: __(
		'Prompt visitors to take action with a button-style link.'
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
		url: {
			type: 'string',
			source: 'attribute',
			selector: BUTTON_LINK_SELECTOR,
			attribute: 'href',
		},
		text: {
			type: 'string',
			source: 'html',
			selector: BUTTON_TEXT_SELECTOR,
		},
		linkTarget: {
			type: 'string',
			source: 'attribute',
			selector: BUTTON_LINK_SELECTOR,
			attribute: 'target',
		},
		rel: {
			type: 'string',
			source: 'attribute',
			selector: BUTTON_LINK_SELECTOR,
			attribute: 'rel',
		},
		icon: {
			type: 'string',
			source: 'html',
			selector: BUTTON_ICON_SELECTOR,
		},
		iconPath: {
			type: 'string',
		},
		iconPosition: {
			type: 'string',
			default: '',
		},
	},
	supports: {
		alignWide: false,
		className: false,
		html: false,
		reusable: false,
		lightBlockWrapper: true,
	},
	parent: [ BUTTONS_BLOCK_NAME ],
	edit,
	save,
};
