/**
 * WordPress dependencies
 */
import { Button, ButtonGroup } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { PLUGIN_NAME } from '../../constants';

export default function BindControlsSwitch( { value, onChange } ) {
	return (
		<ButtonGroup className={ `${ PLUGIN_NAME }-bind-controls-switch` }>
			<Button
				type="button"
				isSmall
				isSecondary={ value === 'all' }
				aria-pressed={ value === 'all' }
				onClick={ () => onChange( 'all' ) }
			>
				{ __( 'all' ) }
			</Button>
			<Button
				type="button"
				isSmall
				isSecondary={ value === 'one' }
				aria-pressed={ value === 'one' }
				onClick={ () => onChange( 'one' ) }
			>
				{ __( 'one' ) }
			</Button>
			<Button
				type="button"
				isSmall
				isSecondary={ value === 'opposite' }
				aria-pressed={ value === 'opposite' }
				onClick={ () => onChange( 'opposite' ) }
			>
				{ __( 'opposite' ) }
			</Button>
		</ButtonGroup>
	);
}
