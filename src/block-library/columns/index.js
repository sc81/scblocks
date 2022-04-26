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
import { variations } from './variations';
import { COLUMNS_NAME } from './utils';
import icon from './icon';
import deprecated from './deprecated';

// block is deprecated since 1.3.0

export const name = COLUMNS_NAME;

export const settings = {
	apiVersion: 2,
	title: __( 'Columns', 'scblocks' ),
	icon,
	category: PLUGIN_NAME,
	attributes: {
		...SHARED_ATTRIBUTES.required,
		...SHARED_ATTRIBUTES.id,
		...SHARED_ATTRIBUTES.classes,
		...SHARED_ATTRIBUTES.label,
		isDynamic: {
			type: 'boolean',
		},
	},
	supports: {
		inserter: false,
		html: false,
		className: false,
		customClassName: false,
	},
	edit,
	save: () => {
		return <InnerBlocks.Content />;
	},
	variations,
	deprecated,
	__experimentalLabel: ( { label } ) => label,
};
