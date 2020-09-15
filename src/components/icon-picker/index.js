/**
 * External dependencies
 */
import dompurify from 'dompurify';

/**
 * WordPress dependencies
 */
import { Button, TextControl } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import IconLibrary from './icon-library';
import { PLUGIN_NAME } from '../../constants';
import ControlWrapper from '../../components/control-wrapper';

function sanitizeSVG( svg ) {
	return dompurify.sanitize( svg, {
		USE_PROFILES: { svg: true, svgFilters: true },
	} );
}

export default function IconPicker( { icon, onSelect, onClear } ) {
	const [ isOpen, setIsOpen ] = useState( false );

	function onSelectIcon( nextIcon ) {
		onSelect( nextIcon );
		setIsOpen( false );
	}
	return (
		<ControlWrapper
			label={ __( 'Icon SVG HTML', 'scblocks' ) }
			withoutSelectDevices
			displayClearButton={ !! icon }
			onClear={ onClear }
		>
			<TextControl
				value={ icon }
				onChange={ ( value ) => onSelectIcon( sanitizeSVG( value ) ) }
				help={ __(
					'Paste the icon here or choose from the Icon Library',
					'scblocks'
				) }
			/>
			<Button
				isSecondary
				className={ `${ PLUGIN_NAME }-icon-picker-button` }
				onClick={ () => setIsOpen( true ) }
			>
				{ __( 'Icon Library', 'scblocks' ) }
			</Button>
			{ isOpen && (
				<IconLibrary
					onSelectIcon={ onSelectIcon }
					onRequestClose={ () => setIsOpen( false ) }
				/>
			) }
		</ControlWrapper>
	);
}
