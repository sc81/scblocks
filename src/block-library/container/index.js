/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InnerBlocks } from '@wordpress/block-editor';

/**
 * ScBlocks dependencies
 */
import { SHARED_ATTRIBUTES } from '@scblocks/block';
import { PLUGIN_NAME } from '@scblocks/constants';

/**
 * Internal dependencies
 */
import edit from './edit';
import icon from './icon';
import variations from './variations';
import deprecated from './deprecated';

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
		...SHARED_ATTRIBUTES.bgImageIds, // deprecated since 1.3.0
		...SHARED_ATTRIBUTES.googleFonts,
		tag: {
			type: 'string',
			default: 'div',
		},
		shapeDividers: {
			type: 'array',
		},
		isDynamic: {
			type: 'boolean',
		},
		isGridItem: {
			type: 'boolean',
			default: false,
		},
		bgImage: {
			type: 'object',
			default: '',
		},
		align: {
			type: 'string',
			default: '',
		},
		useThemeContentWidth: {
			type: 'boolean',
			default: false,
		},
	},
	supports: {
		className: false,
		html: false,
		customClassName: false,
	},
	edit,
	save: () => {
		return <InnerBlocks.Content />;
	},
	variations,
	deprecated,
};
