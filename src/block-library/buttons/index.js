/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { PLUGIN_NAME } from '../../constants';

import save from './save';
import edit from './edit';
import variations from './variations';
import { BUTTONS_BLOCK_NAME } from './utils';
import icon from './icon';
import { SHARED_ATTRIBUTES } from '../../block/shared-attributes';

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
		...SHARED_ATTRIBUTES.required,
		...SHARED_ATTRIBUTES.id,
		...SHARED_ATTRIBUTES.classes,
	},
	supports: {
		alignWide: false,
		className: false,
		lightBlockWrapper: true,
		customClassName: false,
	},
	edit,
	save,
	variations,
};
