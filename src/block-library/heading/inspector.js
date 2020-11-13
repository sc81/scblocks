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
	setPropsForVariousDevices,
	setPropValue,
} from '../../utils';
import IdClassesControls from '../../block/id-classes-controls';
import { ALL_DEVICES } from '../../constants';

export default function Inspector( props ) {
	const { attributes, setAttributes } = props;
	const { tagName, icon } = attributes;
	function onRemoveIcon() {
		setAttributes( {
			icon: '',
		} );
		const attrs = {
			css: {},
		};
		function setAttrs( next ) {
			attrs.css = next.css;
		}
		setPropsForVariousDevices( {
			attributes,
			setAttributes: setAttrs,
			selector: BLOCK_SELECTOR.heading.main.alias,
			everyDeviceProps: {
				display: '',
				flexDirection: '',
				alignItems: '',
				justifyContent: '',
			},
		} );
		removeSelectors( {
			attributes: attrs,
			setAttributes,
			selectors: [ BLOCK_SELECTOR.heading.icon.alias ],
		} );
	}
	function onSelectIcon( value ) {
		setAttributes( { icon: value } );
		setPropValue( {
			attributes,
			setAttributes,
			devices: ALL_DEVICES,
			selector: BLOCK_SELECTOR.heading.main.alias,
			propName: 'display',
			value: 'flex',
		} );
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
