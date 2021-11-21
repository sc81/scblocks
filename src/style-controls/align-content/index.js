/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
/**
 * Internal dependencies
 */
import Adjust from '../adjust';

export default function AlignContent( props ) {
	return (
		<Adjust
			{ ...props }
			label={ __( 'Align-Content', 'scblocks' ) }
			propName="alignContent"
			propSuffix="content"
		/>
	);
}
