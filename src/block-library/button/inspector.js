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
import {
	selectors,
	BUTTON_ICON_SELECTOR,
	BUTTON_SELECTOR,
	BUTTON_LINK_SELECTOR,
} from './utils';
import {
	getPropertiesValue,
	setPropsAndSettings,
	setPropsSettingsForVariousSelectors,
	setPropValue,
	getPropValue,
} from '../../utils';
import { ALL_DEVICES } from '../../constants';

export default function Inspector( {
	attributes,
	setAttributes,
	onToggleOpenInNewTab,
	devices,
	blockMemo,
} ) {
	const {
		linkTarget,
		rel,
		icon,
		iconPath,
		iconPosition,
		alignment,
	} = attributes;

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
	const flexGrow = getPropValue( {
		attributes,
		devices: ALL_DEVICES,
		selector: BUTTON_SELECTOR,
		propName: 'flexGrow',
	} );

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
	function setAlignment( value ) {
		let width = '',
			justifyContent = '';
		if ( value === 'stretch' ) {
			width = '100%';
		} else {
			justifyContent = value;
		}
		setPropsSettingsForVariousSelectors( {
			attributes,
			setAttributes,
			devices,
			selectorsProps: {
				[ BUTTON_SELECTOR ]: {
					justifyContent,
				},
				[ BUTTON_LINK_SELECTOR ]: {
					width,
				},
			},
		} );
		setAttributes( { alignment: value } );
	}
	function onChangeDisplayButton( value ) {
		let nextFlexGrow = '';
		if ( value ) {
			nextFlexGrow = '1';
		}
		setPropValue( {
			attributes,
			setAttributes,
			devices: ALL_DEVICES,
			selector: BUTTON_SELECTOR,
			value: nextFlexGrow,
			propName: 'flexGrow',
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
							<ToggleControl
								label={ __( 'Display button like column' ) }
								checked={ !! flexGrow }
								onChange={ onChangeDisplayButton }
							/>
							<SelectControl
								label={ __( 'Alignment' ) }
								value={ alignment }
								options={ [
									{ label: __( 'Default' ), value: '' },
									{
										label: __( 'Left' ),
										value: 'flex-start',
									},
									{ label: __( 'Center' ), value: 'center' },
									{ label: __( 'Right' ), value: 'flex-end' },
									{
										label: __( 'Stretch' ),
										value: 'stretch',
									},
								] }
								onChange={ setAlignment }
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
