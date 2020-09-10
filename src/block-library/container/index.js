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
import { variations } from './variations';
import { SHARED_ATTRIBUTES } from '../../block/shared-attributes';

export const name = `${ PLUGIN_NAME }/container`;

export const settings = {
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
		lightBlockWrapper: true,
		customClassName: false,
	},
	edit,
	save,
	variations,
};
