/**
 * WordPress dependencies
 */
import { InspectorControls } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { SelectControl, PanelBody } from '@wordpress/components';
import { useMemo } from '@wordpress/element';
import { applyFilters } from '@wordpress/hooks';

/**
 * ScBlocks dependencies
 */
import {
	BLOCK_SELECTOR,
	IdClassesControls,
	ControlsManager,
} from '@scblocks/block';
import { setPropValue, getPropValue } from '@scblocks/css-utils';
import { NumberUnit, Separator, SelectHtmlTag } from '@scblocks/components';

/**
 * Internal dependencies
 */
import propertyService from '../../style-controls/property-service';

const options = [
	{ label: __( 'Default', 'scblocks' ), value: '' },
	{ label: __( 'Custom' ), value: 'custom' },
	{ label: '10%', value: '10%' },
	{ label: '15%', value: '15%' },
	{ label: '20%', value: '20%' },
	{ label: '25%', value: '25%' },
	{ label: '30', value: '30%' },
	{ label: '33.33%', value: '33.33%' },
	{ label: '35%', value: '35%' },
	{ label: '40%', value: '40%' },
	{ label: '45%', value: '45%' },
	{ label: '50%', value: '50%' },
	{ label: '55%', value: '55%' },
	{ label: '60%', value: '60%' },
	{ label: '65%', value: '65%' },
	{ label: '66.66%', value: '66.66%' },
	{ label: '70%', value: '70%' },
	{ label: '75%', value: '75%' },
	{ label: '80%', value: '80%' },
	{ label: '85%', value: '85%' },
	{ label: '90%', value: '90%' },
	{ label: '100%', value: '100%' },
];

function ColumnWidth( props ) {
	const { propValue, onChange } = propertyService( {
		...props,
		propName: 'width',
	} );
	const selectWidth = useMemo( () => {
		const valueIndex = options.findIndex(
			( elm ) => elm.value === propValue
		);
		return valueIndex > -1 ? propValue : 'custom';
	}, [ propValue ] );

	function onChangeSelect( value ) {
		if ( value === 'custom' ) {
			value = propValue;
		}
		onChange( value );
	}

	return (
		<>
			<SelectControl
				label={ __( 'Select width', 'scblocks' ) }
				value={ selectWidth }
				options={ options }
				onChange={ onChangeSelect }
			/>
			<NumberUnit
				label={ __( 'Column Width' ) }
				value={ propValue }
				onChange={ onChange }
				onClear={ () => onChange( '' ) }
				units={ [ '%' ] }
				displayClearButton
			/>
		</>
	);
}

export default function Inspector( props ) {
	const { attributes, setAttributes, devices } = props;
	const verticalGap = getPropValue( {
		attributes,
		setAttributes,
		devices,
		selector: BLOCK_SELECTOR.column.main.alias,
		propName: 'paddingBottom',
	} );
	function onChangeVerticalGap( value ) {
		setPropValue( {
			attributes,
			setAttributes,
			devices,
			selector: BLOCK_SELECTOR.column.main.alias,
			propName: 'paddingBottom',
			value,
		} );
	}
	return (
		<InspectorControls>
			<ControlsManager
				{ ...props }
				mainControls={ applyFilters(
					'scblocks.column.mainControls',
					<PanelBody opened>
						<SelectHtmlTag
							value={ attributes.tag }
							onChange={ ( value ) =>
								setAttributes( { tag: value } )
							}
						/>
					</PanelBody>,
					props
				) }
				htmlAttrsControls={ applyFilters(
					'scblocks.column.htmlAttrControls',
					<PanelBody opened>
						<IdClassesControls
							attributes={ attributes }
							setAttributes={ setAttributes }
						/>
					</PanelBody>,
					props
				) }
				spacePanelAdditionalControls={
					<>
						<ColumnWidth
							setAttributes={ setAttributes }
							attributes={ attributes }
							devices={ devices }
							selector={ BLOCK_SELECTOR.column.main.alias }
						/>
						<Separator />
						<NumberUnit
							label={ __( 'Vertical gap' ) }
							value={ verticalGap }
							onChange={ onChangeVerticalGap }
							onClear={ () => onChangeVerticalGap( '' ) }
							units={ [ 'px' ] }
							displayClearButton
						/>
						<Separator />
					</>
				}
			/>
		</InspectorControls>
	);
}
