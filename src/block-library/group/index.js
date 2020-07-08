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
import icon from './icon';

export const name = `${ PLUGIN_NAME }/group`;

export const settings = {
	title: __( 'Group' ),
	icon,
	category: PLUGIN_NAME,
	description: __( 'A block that groups other blocks.' ),
	keywords: [
		__( 'container' ),
		__( 'wrapper' ),
		__( 'row' ),
		__( 'section' ),
	],
	attributes: {
		section: {
			type: 'string',
		},
		css: {
			type: 'object',
			default: {},
		},
		tag: {
			type: 'string',
			default: 'div',
		},
		uidClass: {
			type: 'string',
			default: '',
		},
		shapeTop: {
			type: 'string',
			source: 'html',
			selector: `.${ PLUGIN_NAME }-shape-top`,
		},
		shapeTopName: {
			type: 'string',
			default: '',
		},
		isNegativeTop: {
			type: 'string',
			source: 'attribute',
			selector: `.${ PLUGIN_NAME }-shape-top`,
			attribute: 'data-negative',
			default: 'false',
		},
		shapeBottom: {
			type: 'string',
			source: 'html',
			selector: `.${ PLUGIN_NAME }-shape-bottom`,
		},
		shapeBottomName: {
			type: 'string',
			default: '',
		},
		isNegativeBottom: {
			type: 'string',
			source: 'attribute',
			selector: `.${ PLUGIN_NAME }-shape-bottom`,
			attribute: 'data-negative',
			default: 'false',
		},
	},

	supports: {
		className: false,
		align: [ 'wide', 'full' ],
		html: false,
		lightBlockWrapper: true,
	},

	edit,

	save,
};
