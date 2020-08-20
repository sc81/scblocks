/**
 * WordPress dependencies
 */
import { PanelBody, TextControl, ToggleControl } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import ControlsManager from '../../components/controls-manager';
import IconPicker from '../../components/icon-picker';
import { selectorsSettings } from './utils';
import { removeSelectors } from '../../utils';
import { SELECTORS } from '../../block/constants';

export default function Inspector( {
	attributes,
	setAttributes,
	onToggleOpenInNewTab,
	devices,
	blockMemo,
	selectorsActivity,
} ) {
	const { linkTarget, rel, icon, iconPath } = attributes;

	function onClearIcon() {
		setAttributes( {
			icon: '',
			iconPath: '',
		} );
		removeSelectors( {
			attributes,
			setAttributes,
			selectors: [ SELECTORS.button.icon.alias ],
		} );
	}

	return (
		<InspectorControls>
			<ControlsManager
				selectorsSettings={ selectorsSettings }
				setAttributes={ setAttributes }
				attributes={ attributes }
				devices={ devices }
				blockMemo={ blockMemo }
				selectorsActivity={ selectorsActivity }
				mainControls={
					<>
						<PanelBody title={ __( 'Link', 'scblocks' ) } opened>
							<ToggleControl
								label={ __( 'Open in new tab', 'scblocks' ) }
								onChange={ onToggleOpenInNewTab }
								checked={ linkTarget === '_blank' }
							/>
							<TextControl
								label={ __( 'Link rel', 'scblocks' ) }
								value={ rel || '' }
								onChange={ ( value ) =>
									setAttributes( { rel: value } )
								}
							/>
						</PanelBody>
						<PanelBody title={ __( 'Icon', 'scblocks' ) } opened>
							<IconPicker
								iconPath={ iconPath }
								icon={ icon }
								onSelect={ ( value ) => {
									setAttributes( value );
								} }
								onClear={ onClearIcon }
							/>
						</PanelBody>
					</>
				}
			/>
		</InspectorControls>
	);
}
