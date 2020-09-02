/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */

import { BUTTON_BLOCK_NAME } from './utils';
import { PLUGIN_NAME } from '../../constants';

import save from './save';
import edit from './edit';
import { BUTTONS_BLOCK_NAME } from '../buttons/utils';
import { SELECTORS } from '../../block/constants';
import { SHARED_ATTRIBUTES } from '../../block/shared-attributes';
import icon from '../buttons/icon';

export const name = BUTTON_BLOCK_NAME;

export const settings = {
	title: __( 'Button', 'scblocks' ),
	description: __(
		'Prompt visitors to take action with a button-style link.'
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
		url: {
			type: 'string',
			source: 'attribute',
			selector: 'a',
			attribute: 'href',
		},
		text: {
			type: 'string',
			source: 'html',
			selector: SELECTORS.button.text.selector,
		},
		linkTarget: {
			type: 'string',
			source: 'attribute',
			selector: 'a',
			attribute: 'target',
		},
		rel: {
			type: 'string',
			source: 'attribute',
			selector: 'a',
			attribute: 'rel',
		},
		icon: {
			type: 'string',
			source: 'html',
			selector: SELECTORS.button.icon.selector,
			default: '',
		},
		withoutText: {
			type: 'boolean',
			default: false,
		},
		...SHARED_ATTRIBUTES.googleFonts,
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
