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
import { variations } from './variations';
import { COLUMNS_NAME } from './utils';
import icon from './icon';
import { SHARED_ATTRIBUTES } from '../../block/shared-attributes';

export const name = COLUMNS_NAME;

export const settings = {
	apiVersion: 2,
	title: __( 'Columns', 'scblocks' ),
	icon,
	category: PLUGIN_NAME,
	description: __(
		'Organize your content with flexible columns.',
		'scblocks'
	),
	attributes: {
		...SHARED_ATTRIBUTES.required,
		...SHARED_ATTRIBUTES.id,
		...SHARED_ATTRIBUTES.classes,
	},
	supports: {
		html: false,
		className: false,
		customClassName: false,
	},
	edit,
	save,
	variations,
};
