/**
 * WordPress dependencies
 */
import { InspectorControls } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';

/**
 * Internal dependencies
 */
import ControlsManager from '../../components/controls-manager';
import { selectorsSettings } from './utils';
import {
	setPropValue,
	getPropValue,
	setPropsForVariousSelectors,
} from '../../utils';
import NumberUnit from '../../components/number-unit';
import { SELECTORS } from '../../block/constants';
import IdClassesControls from '../../block/id-classes-controls.js';

const ALL_COLUMNS_SELECTOR_ALIAS = SELECTORS.columns.allColumns.alias;

export default function Inspector( {
	attributes,
	setAttributes,
	devices,
	blockMemo,
} ) {
	const horizontalGap = getPropValue( {
		attributes,
		setAttributes,
		devices,
		selector: ALL_COLUMNS_SELECTOR_ALIAS,
		propName: 'paddingLeft',
	} );
	const verticalGap = getPropValue( {
		attributes,
		setAttributes,
		devices,
		selector: ALL_COLUMNS_SELECTOR_ALIAS,
		propName: 'paddingBottom',
	} );
	function onChangeVerticalGap( value ) {
		setPropValue( {
			attributes,
			setAttributes,
			devices,
			selector: ALL_COLUMNS_SELECTOR_ALIAS,
			propName: 'paddingBottom',
			value,
		} );
	}
	function onChangeHorizontalGap( value ) {
		let marginLeft = '';
		if ( value ) {
			marginLeft = `-${ value }`;
		}
		setPropsForVariousSelectors( {
			attributes,
			setAttributes,
			devices,
			props: {
				[ ALL_COLUMNS_SELECTOR_ALIAS ]: {
					paddingLeft: value,
				},
				[ SELECTORS.blockMainSelectorAlias ]: {
					marginLeft,
				},
			},
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
				mainControls={
					<PanelBody opened>
						<IdClassesControls
							attributes={ attributes }
							setAttributes={ setAttributes }
						/>
					</PanelBody>
				}
				spacePanelAdditionalControls={
					<>
						<NumberUnit
							label={ __( 'Horizontal gap' ) }
							value={ horizontalGap }
							onChange={ onChangeHorizontalGap }
							onClear={ () => onChangeHorizontalGap( '' ) }
							units={ [ 'px' ] }
							displayClearButton
						/>
						<NumberUnit
							label={ __( 'Vertical gap' ) }
							value={ verticalGap }
							onChange={ onChangeVerticalGap }
							onClear={ () => onChangeVerticalGap( '' ) }
							units={ [ 'px' ] }
							displayClearButton
						/>
					</>
				}
			/>
		</InspectorControls>
	);
}
