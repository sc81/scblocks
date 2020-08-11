/**
 * WordPress dependencies
 */
import { ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { removeSelectors } from '../utils';
import { BG_OVERLAY_SELECTOR } from '../constants';

export default function BackgroundOverlaySwitch( {
	attributes,
	setAttributes,
} ) {
	function onChange( value ) {
		setAttributes( { isBackgroundOverlay: value } );
		if ( ! value ) {
			removeSelectors( {
				attributes,
				setAttributes,
				selectors: [ BG_OVERLAY_SELECTOR ],
			} );
		}
	}
	return (
		<ToggleControl
			label={ __( 'Background overlay', 'scblocks' ) }
			checked={ attributes.isBackgroundOverlay }
			onChange={ onChange }
		/>
	);
}
