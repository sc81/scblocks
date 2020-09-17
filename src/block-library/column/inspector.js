/**
 * WordPress dependencies
 */
import { InspectorControls } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { SelectControl, PanelBody } from '@wordpress/components';
import { useMemo } from '@wordpress/element';

/**
 * Internal dependencies
 */
import ControlsManager from '../../components/controls-manager';
import { setPropValue, getPropValue } from '../../utils';
import { selectorsSettings } from './utils';
import NumberUnit from '../../components/number-unit';
import { BLOCK_SELECTOR } from '../../block/constants';
import Separator from '../../components/separator';
import propertyService from '../../style-controls/property-service';
import IdClassesControls from '../../block/id-classes-controls.js';

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

export default function Inspector( {
	attributes,
	setAttributes,
	devices,
	blockMemo,
} ) {
	const verticalGap = getPropValue( {
		attributes,
		setAttributes,
		devices,
		selector: BLOCK_SELECTOR.blockMainSelectorAlias,
		propName: 'paddingBottom',
	} );
	function onChangeVerticalGap( value ) {
		setPropValue( {
			attributes,
			setAttributes,
			devices,
			selector: BLOCK_SELECTOR.blockMainSelectorAlias,
			propName: 'paddingBottom',
			value,
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
				htmlAttrsControls={
					<PanelBody opened>
						<IdClassesControls
							attributes={ attributes }
							setAttributes={ setAttributes }
						/>
					</PanelBody>
				}
				spacePanelAdditionalControls={
					<>
						<ColumnWidth
							setAttributes={ setAttributes }
							attributes={ attributes }
							devices={ devices }
							selector={ BLOCK_SELECTOR.blockMainSelectorAlias }
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
