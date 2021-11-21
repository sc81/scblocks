/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
/**
 * Internal dependencies
 */
import Adjust from '../adjust';

export default function JustifyItems( props ) {
	return (
		<Adjust
			{ ...props }
			label={ __( 'Justify-Items', 'scblocks' ) }
			propName="justifyItems"
			propSuffix="items"
		/>
	);
}
