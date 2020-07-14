/**
 * WordPress dependencies
 */
import {
	PanelBody,
	TextControl,
	ToggleControl,
	SelectControl,
	RangeControl,
} from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import ControlsManager from '../../components/controls-manager';
import IconPicker from '../../components/icon-picker';
import { selectors, BUTTON_ICON_SELECTOR, BUTTON_SELECTOR } from './utils';
import { getPropertiesValue, setPropsAndSettings } from '../../utils';
import { ALL_DEVICES } from '../../constants';
import NumberProperty from '../../style-controls/number-property';

export default function Inspector( {
	attributes,
	setAttributes,
	onToggleOpenInNewTab,
	devices,
	blockMemo,
} ) {
	const { linkTarget, rel, icon, iconPath, iconPosition } = attributes;

	const { marginRight, marginLeft } = getPropertiesValue( {
		attributes,
		devices: ALL_DEVICES,
		selector: BUTTON_ICON_SELECTOR,
		props: [ 'marginRight', 'marginLeft' ],
	} );
	let iconSpacing;
	if ( iconPosition === 'after' ) {
		iconSpacing = marginLeft;
	} else {
		iconSpacing = marginRight;
	}
	if ( iconSpacing ) {
		iconSpacing = parseFloat( iconSpacing );
	}

	function setIconSpacing( value ) {
		let nextMarginRight = '',
			nextMarginLeft = '';
		if ( value || value === 0 ) {
			if ( iconPosition === 'before' ) {
				nextMarginRight = value + 'px';
			} else {
				nextMarginLeft = value + 'px';
			}
		}
		setPropsAndSettings( {
			attributes,
			setAttributes,
			devices: ALL_DEVICES,
			selector: BUTTON_ICON_SELECTOR,
			props: {
				marginRight: nextMarginRight,
				marginLeft: nextMarginLeft,
			},
		} );
	}
	function setIconPosition( value ) {
		let nextMarginRight, nextMarginLeft;
		if ( value === 'before' ) {
			nextMarginRight = marginLeft;
		} else {
			nextMarginLeft = marginRight;
		}
		setAttributes( { iconPosition: value } );
		setPropsAndSettings( {
			attributes,
			setAttributes,
			devices: ALL_DEVICES,
			selector: BUTTON_ICON_SELECTOR,
			props: {
				marginRight: nextMarginRight,
				marginLeft: nextMarginLeft,
			},
		} );
	}

	return (
		<InspectorControls>
			<ControlsManager
				selectors={ selectors }
				setAttributes={ setAttributes }
				attributes={ attributes }
				devices={ devices }
				blockMemo={ blockMemo }
				mainControls={
					<>
						<PanelBody opened>
							<NumberProperty
								label={ __( 'Get extra space' ) }
								propName="flexGrow"
								setAttributes={ setAttributes }
								attributes={ attributes }
								devices={ ALL_DEVICES }
								selector={ BUTTON_SELECTOR }
								max={ 30 }
							/>
						</PanelBody>
						<PanelBody title={ __( 'Link' ) } opened>
							<ToggleControl
								label={ __( 'Open in new tab' ) }
								onChange={ onToggleOpenInNewTab }
								checked={ linkTarget === '_blank' }
							/>
							<TextControl
								label={ __( 'Link rel' ) }
								value={ rel || '' }
								onChange={ ( value ) =>
									setAttributes( { rel: value } )
								}
							/>
						</PanelBody>
						<PanelBody title={ __( 'Icon' ) } opened>
							<IconPicker
								iconPath={ iconPath }
								icon={ icon }
								onChange={ ( value ) => setAttributes( value ) }
								allowClear
							/>
							<SelectControl
								label={ __( 'Icon position' ) }
								value={ iconPosition }
								options={ [
									{ label: __( 'Before' ), value: 'before' },
									{ label: __( 'After' ), value: 'after' },
								] }
								onChange={ setIconPosition }
							/>
							<RangeControl
								label={ __( 'Icon spacing' ) }
								value={ iconSpacing }
								onChange={ setIconSpacing }
								min={ 0 }
								max={ 50 }
								allowReset
							/>
						</PanelBody>
					</>
				}
			/>
		</InspectorControls>
	);
}
