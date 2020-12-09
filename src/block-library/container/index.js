/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * ScBlocks dependencies
 */
import { SHARED_ATTRIBUTES, BLOCK_SELECTOR } from '@scblocks/block';
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
		...SHARED_ATTRIBUTES.googleFonts,
		tag: {
			type: 'string',
			default: 'div',
		},
		isRootContainer: {
			type: 'boolean',
			default: false,
		},
		shapeDividers: {
			type: 'array',
			source: 'query',
			selector: BLOCK_SELECTOR.container.shape.selector,
			query: {
				shape: {
					type: 'string',
					source: 'html',
				},
				id: {
					type: 'string',
					source: 'attribute',
					attribute: 'data-id',
				},
			},
			default: [],
		},
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
