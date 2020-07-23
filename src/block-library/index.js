/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import * as button from './button';
import * as buttons from './buttons';
import * as group from './group';
import * as heading from './heading';

[ button, buttons, group, heading ].forEach( ( { name, settings } ) => {
	registerBlockType( name, settings );
} );
