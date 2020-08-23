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
import { HEADING_BLOCK_NAME } from './utils';

export const name = HEADING_BLOCK_NAME;

export const settings = {
	title: __( 'Heading', 'scblocks' ),
	icon,
	category: PLUGIN_NAME,
	attributes: {
		tagName: {
			type: 'string',
			default: 'h2',
		},
		text: {
			type: 'string',
			source: 'html',
			selector: 'p,h1,h2,h3,h4,h5,h6',
			default: '',
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
