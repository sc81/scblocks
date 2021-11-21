/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
/**
 * Internal dependencies
 */
import Adjust from '../adjust';

export default function AlignSelf( props ) {
	return (
		<Adjust
			{ ...props }
			label={ __( 'Align-Self', 'scblocks' ) }
			propName="alignSelf"
			propSuffix="self"
		/>
	);
}
