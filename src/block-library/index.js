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

[ button, buttons, group ].forEach( ( { name, settings } ) => {
	registerBlockType( name, settings );
} );
