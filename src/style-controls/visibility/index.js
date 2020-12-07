/**
 * WordPress dependencies
 */
import { ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * ScBlocks dependencies
 */
import { ControlWrapper } from '@scblocks/components';

/**
 * Internal dependencies
 */
import propertyService from '../property-service';

const propName = 'display';

export default function Visibility( props ) {
	const { propValue, onChange } = propertyService( {
		...props,
		propName,
	} );

	function onChangeToggle( value ) {
		let next = '';
		if ( value ) {
			next = 'none';
		}
		onChange( next );
	}

	return (
		<ControlWrapper label={ __( 'Hide element', 'scblocks' ) }>
			<ToggleControl
				help={
					propValue
						? __( 'Hidden', 'scblocks' )
						: __( 'Visible', 'scblocks' )
				}
				checked={ !! propValue }
				onChange={ onChangeToggle }
			/>
		</ControlWrapper>
	);
}
