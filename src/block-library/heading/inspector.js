/**
 * WordPress dependencies
 */
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { applyFilters } from '@wordpress/hooks';
import { useSelect, dispatch, select } from '@wordpress/data';

/**
 * ScBlocks dependencies
 */
import {
	BLOCK_SELECTOR,
	IdClassesControls,
	ControlsManager,
	getIconAttrs,
	setSelectorActivity,
} from '@scblocks/block';
import { ALL_DEVICES, STORE_NAME } from '@scblocks/constants';
import {
	removeSelectors,
	setPropsForVariousDevices,
	setPropValue,
} from '@scblocks/css-utils';
import { IconPicker } from '@scblocks/components';

export default function Inspector( props ) {
	const {
		attributes,
		setAttributes,
		setSelectorsSettings,
		selectorsSettings,
	} = props;
	const { tagName, iconId } = attributes;
	const icon = useSelect(
		( store ) => {
			const icons = store( STORE_NAME ).usedIcons();
			if ( icons && icons[ iconId ] ) {
				return icons[ iconId ];
			}
			return '';
		},
		[ iconId ]
	);
	function onRemoveIcon() {
		setAttributes( {
			iconId: '',
			iconHtml: '',
			iconName: '',
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
		setSelectorsSettings(
			setSelectorActivity(
				selectorsSettings,
				BLOCK_SELECTOR.heading.icon.alias,
				false
			)
		);
	}
	function onSelectIcon( name, iconAsString ) {
		if ( ! iconAsString ) {
			onRemoveIcon();
			return;
		}
		const icons = select( STORE_NAME ).usedIcons();
		const iconAttrs = getIconAttrs( name, iconAsString, icons );

		setAttributes( iconAttrs );
		setPropValue( {
			attributes,
			setAttributes,
			devices: ALL_DEVICES,
			selector: BLOCK_SELECTOR.heading.main.alias,
			propName: 'display',
			value: 'flex',
		} );
		if ( iconAttrs.iconHtml ) {
			dispatch( STORE_NAME ).addUsedIcon(
				iconAttrs.iconId,
				iconAsString
			);
		}
		setSelectorsSettings(
			setSelectorActivity(
				selectorsSettings,
				BLOCK_SELECTOR.heading.icon.alias,
				true
			)
		);
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
