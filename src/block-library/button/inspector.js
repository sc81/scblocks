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
import { BLOCK_SELECTOR } from '../../block/constants';
import IdClassesControls from '../../block/id-classes-controls.js';

export default function Inspector( {
	attributes,
	setAttributes,
	devices,
	blockMemo,
	selectorsActivity,
} ) {
	const { icon, withoutText, ariaLabel } = attributes;

	function onClearIcon() {
		setAttributes( {
			icon: '',
			withoutText: false,
			ariaLabel: '',
		} );
		removeSelectors( {
			attributes,
			setAttributes,
			selectors: [ BLOCK_SELECTOR.button.icon.alias ],
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
					<PanelBody opened>
						<IconPicker
							icon={ icon }
							onSelect={ ( value ) => {
								setAttributes( { icon: value } );
							} }
							onClear={ onClearIcon }
						/>
						{ !! icon && (
							<ToggleControl
								label={ __( 'Without text', 'scblocks' ) }
								checked={ withoutText }
								onChange={ ( value ) => {
									setAttributes( { withoutText: value } );
									if ( ! value ) {
										setAttributes( { ariaLabel: '' } );
									}
								} }
							/>
						) }
					</PanelBody>
				}
				htmlAttrsControls={
					<PanelBody opened>
						<IdClassesControls
							attributes={ attributes }
							setAttributes={ setAttributes }
						/>
						{ withoutText && (
							<TextControl
								label={ __( 'ARIA Label', 'scblocks' ) }
								help={ __(
									'Describe the purpose of the button. This is useful for people who use screen readers when the button has no text.',
									'scblocks'
								) }
								value={ ariaLabel }
								onChange={ ( value ) => {
									setAttributes( {
										ariaLabel: value,
									} );
								} }
							/>
						) }
					</PanelBody>
				}
			/>
		</InspectorControls>
	);
}
