/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { heading as icon } from '@wordpress/icons';
/**
 * Internal dependencies
 */
import { PLUGIN_NAME } from '../../constants';
import edit from './edit';
import save from './save';
import { SELECTORS } from '../../block/constants';

export const name = PLUGIN_NAME + '/heading';

export const settings = {
	title: __( 'Heading', 'scblocks' ),
	icon,
	category: PLUGIN_NAME,
	attributes: {
		level: {
			type: 'string',
			default: 'h2',
		},
		icon: {
			type: 'string',
			source: 'html',
			selector: SELECTORS.heading.icon.selector,
		},
		iconPath: {
			type: 'string',
			default: '',
		},
		text: {
			type: 'string',
			source: 'html',
			selector: SELECTORS.heading.text.selector,
		},
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
		anchor: true,
		html: false,
		className: false,
		lightBlockWrapper: true,
	},
	edit,
	save,
};
