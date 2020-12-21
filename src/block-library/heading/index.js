/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * ScBlocks dependencies
 */
import { BLOCK_SELECTOR, SHARED_ATTRIBUTES } from '@scblocks/block';
import { PLUGIN_NAME } from '@scblocks/constants';

/**
 * Internal dependencies
 */
import edit from './edit';
import save from './save';
import { HEADING_BLOCK_NAME } from './utils';
import icon from './icon';

export const name = HEADING_BLOCK_NAME;

export const settings = {
	apiVersion: 2,
	title: __( 'Heading', 'scblocks' ),
	icon,
	category: PLUGIN_NAME,
	attributes: {
		...SHARED_ATTRIBUTES.required,
		tagName: {
			type: 'string',
			default: 'h2',
		},
		text: {
			type: 'string',
			source: 'html',
			selector: BLOCK_SELECTOR.heading.text.selector,
			default: '',
		},
		icon: {
			type: 'string',
			source: 'html',
			selector: BLOCK_SELECTOR.heading.icon.selector,
			default: '',
		},
		...SHARED_ATTRIBUTES.googleFonts,
		...SHARED_ATTRIBUTES.id,
		...SHARED_ATTRIBUTES.classes,
	},
	supports: {
		anchor: false,
		html: false,
		className: false,
		customClassName: false,
	},
	edit,
	save,
};
