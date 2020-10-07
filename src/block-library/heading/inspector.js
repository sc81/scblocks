/**
 * WordPress dependencies
 */
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { applyFilters } from '@wordpress/hooks';

/**
 * Internal dependencies
 */
import ControlsManager from '../../components/controls-manager';
import { BLOCK_SELECTOR } from '../../block/constants';
import IconPicker from '../../components/icon-picker';
import {
	removeSelectors,
	getPropsForEveryDevice,
	setPropsForVariousDevices,
} from '../../utils';
import IdClassesControls from '../../block/id-classes-controls';

const typographyProps = [
	'fontSize',
	'fontFamily',
	'fontWeight',
	'fontStyle',
	'lineHeight',
	'letterSpacing',
	'textDecoration',
	'textTransform',
];

export default function Inspector( props ) {
	const { attributes, setAttributes } = props;
	const { tagName, icon } = attributes;
	function onRemoveIcon() {
		setAttributes( {
			icon: '',
			isWrapped: false,
		} );
		const properties = getPropsForEveryDevice( {
			attributes,
			selector: BLOCK_SELECTOR.headingWrapped.text.alias,
			props: typographyProps,
		} );
		const attrs = {
			css: {},
		};
		function setAttrs( next ) {
			attrs.css = next.css;
		}
		// rewrite typography props
		setPropsForVariousDevices( {
			attributes,
			setAttributes: setAttrs,
			selector: BLOCK_SELECTOR.heading.main.alias,
			props: properties,
		} );
		// delete flex props
		setPropsForVariousDevices( {
			attributes: attrs,
			setAttributes: setAttrs,
			selector: BLOCK_SELECTOR.heading.main.alias,
			everyDeviceProps: {
				flexDirection: '',
				justifyContent: '',
				alignItems: '',
			},
		} );
		// remove unnecessary selectors
		removeSelectors( {
			attributes: attrs,
			setAttributes,
			selectors: [
				BLOCK_SELECTOR.headingWrapped.icon.alias,
				BLOCK_SELECTOR.headingWrapped.text.alias,
			],
		} );
	}
	function onSelectIcon( value ) {
		const properties = getPropsForEveryDevice( {
			attributes,
			selector: BLOCK_SELECTOR.headingWrapped.main.alias,
			props: typographyProps,
		} );
		const attrs = {
			css: {},
		};
		function setAttrs( next ) {
			attrs.css = next.css;
		}
		// rewrite typography props
		setPropsForVariousDevices( {
			attributes,
			setAttributes: setAttrs,
			selector: BLOCK_SELECTOR.headingWrapped.text.alias,
			props: properties,
		} );
		// delete typography props from the main selector
		setPropsForVariousDevices( {
			attributes: attrs,
			setAttributes,
			selector: BLOCK_SELECTOR.headingWrapped.main.alias,
			everyDeviceProps: {
				fontSize: '',
				fontFamily: '',
				fontWeight: '',
				fontStyle: '',
				lineHeight: '',
				letterSpacing: '',
				textDecoration: '',
				textTransform: '',
			},
		} );
		setAttributes( { icon: value, isWrapped: true } );
	}
	return (
		<InspectorControls>
			<ControlsManager
				{ ...props }
				mainControls={ applyFilters(
					'scblocks.heading.mainControls',
					<PanelBody opened>
						<SelectControl
							label={ __( 'Element', 'scblocks' ) }
							value={ tagName }
							options={ [
								{
									label: __( 'H1', 'scblocks' ),
									value: 'h1',
								},
								{
									label: __( 'H2', 'scblocks' ),
									value: 'h2',
								},
								{
									label: __( 'H3', 'scblocks' ),
									value: 'h3',
								},
								{
									label: __( 'H4', 'scblocks' ),
									value: 'h4',
								},
								{
									label: __( 'H5', 'scblocks' ),
									value: 'h5',
								},
								{
									label: __( 'H6', 'scblocks' ),
									value: 'h6',
								},
								{
									label: __( 'p', 'scblocks' ),
									value: 'p',
								},
							] }
							onChange={ ( value ) =>
								setAttributes( { tagName: value } )
							}
						/>
						<IconPicker
							icon={ icon }
							onSelect={ onSelectIcon }
							onClear={ onRemoveIcon }
						/>
					</PanelBody>,
					props
				) }
				htmlAttrsControls={ applyFilters(
					'scblocks.heading.htmlAttrControls',
					<PanelBody opened>
						<IdClassesControls { ...props } />
					</PanelBody>,
					props
				) }
			/>
		</InspectorControls>
	);
}
