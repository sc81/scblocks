/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
/**
 * Internal dependencies
 */
import Adjust from '../adjust';

export default function JustifySelf( props ) {
	return (
		<Adjust
			{ ...props }
			label={ __( 'Justify-Self', 'scblocks' ) }
			propName="justifySelf"
			propSuffix="self"
		/>
	);
}
