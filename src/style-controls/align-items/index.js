/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import Adjust from '../adjust';

export default function AlignItems( props ) {
	return (
		<Adjust
			{ ...props }
			label={ __( 'Align-items', 'scblocks' ) }
			propName="alignItems"
			propSuffix="items"
		/>
	);
}
