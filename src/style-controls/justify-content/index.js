/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
/**
 * Internal dependencies
 */
import Adjust from '../adjust';

export default function JustifyContent( props ) {
	return (
		<Adjust
			{ ...props }
			label={ __( 'Justify-Content', 'scblocks' ) }
			propName="justifyContent"
			propSuffix="content"
		/>
	);
}
