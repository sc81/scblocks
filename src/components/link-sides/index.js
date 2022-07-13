/**
 * WordPress dependencies
 */
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { link, linkOff } from '@wordpress/icons';

export default function LinkSides( { isLinked, onClick } ) {
	return (
		<Button
			label={ isLinked ? __( 'Unlink Sides' ) : __( 'Link Sides' ) }
			variant={ isLinked ? 'primary' : 'secondary' }
			icon={ isLinked ? link : linkOff }
			onClick={ onClick }
			isSmall
		/>
	);
}
