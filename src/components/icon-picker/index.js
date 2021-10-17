/**
 * WordPress dependencies
 */
import { Button, TextControl } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * ScBlocks dependencies
 */
import { PLUGIN_NAME } from '@scblocks/constants';

/**
 * Internal dependencies
 */
import IconLibrary from './icon-library';
import ControlWrapper from '../control-wrapper';
import sanitizeSVG from '../sanitize-svg';

export default function IconPicker( { icon, onSelect, onClear } ) {
	const [ isOpen, setIsOpen ] = useState( false );

	function onSelectIcon( iconName, nextIcon ) {
		onSelect( iconName, nextIcon );
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
