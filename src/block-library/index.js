/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import * as group from './group';

[ group ].forEach( ( { name, settings } ) => {
	registerBlockType( name, settings );
} );
