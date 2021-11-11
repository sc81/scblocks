/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { applyFilters } from '@wordpress/hooks';

/**
 * Internal dependencies
 */
import * as button from './button';
import * as buttons from './buttons';
import * as column from './column';
import * as columns from './columns';
import * as container from './container';
import * as heading from './heading';
import * as grid from './grid';

[ button, buttons, column, columns, container, heading, grid ].forEach(
	( { name, settings } ) => {
		const blockName = name.replace( 'scblocks/', '' );
		registerBlockType(
			name,
			applyFilters( `scblocks.${ blockName }.settings`, settings )
		);
	}
);
