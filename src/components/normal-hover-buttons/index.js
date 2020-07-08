/**
 * WordPress dependencies
 */
import { Button, ButtonGroup } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { PLUGIN_NAME } from '../../constants';

export default function NormalHoverButtons( { isHover, onChange } ) {
	return (
		<ButtonGroup className={ `${ PLUGIN_NAME }-button-group two` }>
			<Button
				isSmall
				isSecondary={ ! isHover }
				aria-pressed={ ! isHover }
				onClick={ () => onChange( false ) }
			>
				<span>{ __( 'Normal' ) }</span>
			</Button>
			<Button
				isSmall
				isSecondary={ isHover }
				aria-pressed={ isHover }
				onClick={ () => onChange( true ) }
			>
				<span>{ __( 'On hover' ) }</span>
			</Button>
		</ButtonGroup>
	);
}
