/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import Align from '../align';

export default function AlignItems( props ) {
	return (
		<Align
			{ ...props }
			label={ __( 'Align-items', 'scblocks' ) }
			propName="alignItems"
			propSufix="items"
		/>
	);
}
