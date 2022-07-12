/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';

export default function ButtonClear( { onClear } ) {
	return (
		<Button
			className="scblocks-button-clear"
			variant="link"
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
