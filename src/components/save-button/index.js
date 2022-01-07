/**
 * WordPress dependencies
 */
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export default function SaveButton( { isDisabled, notice, onClick } ) {
	return (
		<div className="scblocks-save-button">
			<Button disabled={ isDisabled } isPrimary onClick={ onClick }>
				{ __( 'Save', 'scblocks' ) }
			</Button>
			<div className={ notice ? '' : 'display-none' }>{ notice }</div>
		</div>
	);
}
