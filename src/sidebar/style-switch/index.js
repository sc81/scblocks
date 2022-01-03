/**
 * WordPress dependencies
 */
import { Button, ButtonGroup } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export default function StyleSwitch( { isSiteStyle, onChange } ) {
	return (
		<ButtonGroup className={ 'scblocks-button-group two' }>
			<Button
				isSmall
				isPrimary={ isSiteStyle }
				aria-pressed={ isSiteStyle }
				onClick={ () => onChange( false ) }
			>
				<span>{ __( 'Site', 'scblocks' ) }</span>
			</Button>
			<Button
				isSmall
				isPrimary={ ! isSiteStyle }
				aria-pressed={ ! isSiteStyle }
				onClick={ () => onChange( true ) }
			>
				<span>{ __( 'Page', 'scblocks' ) }</span>
			</Button>
		</ButtonGroup>
	);
}
