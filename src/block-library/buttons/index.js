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
import save from './save';
import edit from './edit';
import variations from './variations';
import { BUTTONS_BLOCK_NAME } from './utils';
import icon from './icon';

export const name = BUTTONS_BLOCK_NAME;

export const settings = {
	apiVersion: 2,
	title: __( 'Buttons', 'scblocks' ),
	description: __(
		'Prompt visitors to take action with a group of button-style links.'
	),
	icon,
	category: PLUGIN_NAME,
	keywords: [ __( 'link', 'scblocks' ) ],
	attributes: {
		...SHARED_ATTRIBUTES.required,
		...SHARED_ATTRIBUTES.id,
		...SHARED_ATTRIBUTES.classes,
	},
	supports: {
		alignWide: false,
		className: false,
		customClassName: false,
	},
	edit,
	save,
	variations,
};
