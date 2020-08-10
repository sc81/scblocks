/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';

export default function ButtonClear( { onClear } ) {
	return (
		<Button
			isSmall
			isSecondary
			onClick={ () => {
				if ( typeof onClear === 'function' ) {
					onClear();
				}
			} }
		>
			{ __( 'Clear', 'scblocks' ) }
		</Button>
	);
}
