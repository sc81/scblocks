/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
/**
 * Internal dependencies
 */

import {
	BUTTON_TEXT_SELECTOR,
	BUTTON_LINK_SELECTOR,
	BUTTON_ICON_SELECTOR,
} from './utils';
import { PLUGIN_NAME } from '../../constants';

import save from './save';
import icon from './icon';
import edit from './edit';

export const name = `${ PLUGIN_NAME }/button`;

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
			default: 'after',
		},
		alignment: {
			type: 'string',
		},
	},
	supports: {
		alignWide: false,
		className: false,
		html: false,
		reusable: false,
	},
	parent: [ `${ PLUGIN_NAME }/buttons` ],
	edit,
	save,
};
