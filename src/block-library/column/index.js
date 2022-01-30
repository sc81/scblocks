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
import { COLUMN_NAME } from './utils';
import icon from './icon';
import deprecated from './deprecated';

export const name = COLUMN_NAME;

export const settings = {
	apiVersion: 2,
	title: __( 'Column', 'scblocks' ),
	parent: [ `${ PLUGIN_NAME }/columns` ],
	category: PLUGIN_NAME,
	icon,
	attributes: {
		...SHARED_ATTRIBUTES.required,
		...SHARED_ATTRIBUTES.id,
		...SHARED_ATTRIBUTES.classes,
		...SHARED_ATTRIBUTES.bgImageIds, // deprecated since 1.3.0
		...SHARED_ATTRIBUTES.googleFonts,
		...SHARED_ATTRIBUTES.label,
		tag: {
			type: 'string',
			default: 'div',
		},
		isDynamic: {
			type: 'boolean',
		},
		bgImage: {
			type: 'object',
			default: '',
		},
	},
	supports: {
		inserter: false,
		reusable: false,
		html: false,
		className: false,
		customClassName: false,
	},
	edit,
	save: () => {
		return <InnerBlocks.Content />;
	},
	deprecated,
	__experimentalLabel: ( { label } ) => label,
};
