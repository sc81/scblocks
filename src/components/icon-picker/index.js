/**
 * WordPress dependencies
 */
import { Button, BaseControl } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import IconLibrary from './icon-library';
import { PLUGIN_NAME } from '../../constants';
import ButtonClear from '../button-clear';

const buttonLabel = __( 'Icon Library' );
const defaultLabel = __( 'Icon' );

export default function IconPicker( {
	iconPath,
	icon,
	onChange,
	onClear,
	label = defaultLabel,
} ) {
	const [ isOpen, setIsOpen ] = useState( false );

	function onSelectIcon( path, nextIcon ) {
		onChange( {
			iconPath: path,
			icon: nextIcon,
		} );
		setIsOpen( false );
	}
	return (
		<BaseControl className={ `${ PLUGIN_NAME }-icon-picker` }>
			<BaseControl.VisualLabel>{ label }</BaseControl.VisualLabel>
			<Button
				isSecondary
				className={ `${ PLUGIN_NAME }-icon-picker-button` }
				onClick={ () => setIsOpen( true ) }
				label={ !! icon && buttonLabel }
				showTooltip={ !! icon }
			>
				{ ! icon && buttonLabel }
				{ !! icon && (
					<span dangerouslySetInnerHTML={ { __html: icon } } />
				) }
			</Button>
			{ !! icon && <ButtonClear onClear={ onClear } /> }

			{ isOpen && (
				<IconLibrary
					iconPath={ iconPath }
					onSelectIcon={ onSelectIcon }
					onRequestClose={ () => setIsOpen( false ) }
				/>
			) }
		</BaseControl>
	);
}
