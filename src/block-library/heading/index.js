/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { PLUGIN_NAME } from '../../constants';
import edit from './edit';
import save from './save';
import { HEADING_BLOCK_NAME } from './utils';
import { SHARED_ATTRIBUTES } from '../../block/shared-attributes';
import icon from './icon';
import { BLOCK_SELECTOR } from '../../block/constants';

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
