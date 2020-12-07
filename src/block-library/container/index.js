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
import edit from './edit';
import save from './save';
import icon from './icon';
import { variations } from './variations';

export const name = `${ PLUGIN_NAME }/container`;

export const settings = {
	apiVersion: 2,
	title: __( 'Container', 'scblocks' ),
	icon,
	category: PLUGIN_NAME,
	description: __( 'Space for other blocks.', 'scblocks' ),
	keywords: [
		__( 'container', 'scblocks' ),
		__( 'wrapper', 'scblocks' ),
		__( 'row', 'scblocks' ),
		__( 'section', 'scblocks' ),
		__( 'group', 'scblocks' ),
	],
	attributes: {
		...SHARED_ATTRIBUTES.required,
		...SHARED_ATTRIBUTES.id,
		...SHARED_ATTRIBUTES.classes,
		...SHARED_ATTRIBUTES.bgImageIds,
		tag: {
			type: 'string',
			default: 'div',
		},
		isRootContainer: {
			type: 'boolean',
			default: false,
		},
		...SHARED_ATTRIBUTES.googleFonts,
	},

	supports: {
		className: false,
		html: false,
		customClassName: false,
	},
	edit,
	save,
	variations,
};
