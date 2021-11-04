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
import { BUTTON_BLOCK_NAME } from './utils';
import edit from './edit';
import { BUTTONS_BLOCK_NAME } from '../buttons/utils';
import icon from '../buttons/icon';
import deprecated from './deprecated';

export const name = BUTTON_BLOCK_NAME;

export const settings = {
	apiVersion: 2,
	title: __( 'Button', 'scblocks' ),
	description: __(
		'Prompt visitors to take action with a button-style link.'
	),
	icon,
	category: PLUGIN_NAME,
	keywords: [ __( 'link', 'scblocks' ) ],
	attributes: {
		...SHARED_ATTRIBUTES.required,
		...SHARED_ATTRIBUTES.id,
		...SHARED_ATTRIBUTES.classes,
		url: {
			type: 'string',
			default: '',
		},
		text: {
			type: 'string',
			default: '',
		},
		target: {
			type: 'boolean',
			default: false,
		},
		relNoFollow: {
			type: 'boolean',
			default: false,
		},
		relSponsored: {
			type: 'boolean',
			default: false,
		},
		withoutText: {
			type: 'boolean',
			default: false,
		},
		ariaLabel: {
			type: 'string',
			default: '',
		},
		isDynamic: {
			type: 'boolean',
		},
		...SHARED_ATTRIBUTES.googleFonts,
		...SHARED_ATTRIBUTES.icon,
	},
	supports: {
		alignWide: false,
		className: false,
		html: false,
		reusable: false,
		customClassName: false,
	},
	parent: [ BUTTONS_BLOCK_NAME ],
	edit,
	deprecated,
};
