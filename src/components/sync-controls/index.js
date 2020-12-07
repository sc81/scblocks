/**
 * WordPress dependencies
 */
import { Button, ButtonGroup } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * ScBlocks dependencies
 */
import { PLUGIN_NAME } from '@scblocks/constants';

export default function SyncControls( { value, onChange } ) {
	return (
		<ButtonGroup className={ `${ PLUGIN_NAME }-sync-controls` }>
			<Button
				type="button"
				isSmall
				isPrimary={ value === 'all' }
				aria-pressed={ value === 'all' }
				onClick={ () => onChange( 'all' ) }
			>
				{ __( 'all', 'scblocks' ) }
			</Button>
			<Button
				type="button"
				isSmall
				isPrimary={ value === 'one' }
				aria-pressed={ value === 'one' }
				onClick={ () => onChange( 'one' ) }
			>
				{ __( 'one', 'scblocks' ) }
			</Button>
			<Button
				type="button"
				isSmall
				isPrimary={ value === 'opposite' }
				aria-pressed={ value === 'opposite' }
				onClick={ () => onChange( 'opposite' ) }
			>
				{ __( 'opposite', 'scblocks' ) }
			</Button>
		</ButtonGroup>
	);
}
