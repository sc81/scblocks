/**
 * WordPress dependencies
 */
import { InspectorControls } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import { applyFilters } from '@wordpress/hooks';

/**
 * ScBlocks dependencies
 */
import { BLOCK_SELECTOR, IdClassesControls } from '@scblocks/block';
import {
	setPropValue,
	getPropValue,
	setPropsForVariousSelectors,
} from '@scblocks/css-utils';
import { ControlsManager, NumberUnit } from '@scblocks/components';

const ALL_COLUMNS_SELECTOR_ALIAS = BLOCK_SELECTOR.columns.column.alias;

export default function Inspector( props ) {
	const { attributes, setAttributes, devices } = props;
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
				[ BLOCK_SELECTOR.columns.main.alias ]: {
					marginLeft,
				},
			},
		} );
	}
	return (
		<InspectorControls>
			<ControlsManager
				{ ...props }
				mainControls={ applyFilters(
					'scblocks.columns.mainControls',
					null,
					props
				) }
				htmlAttrsControls={ applyFilters(
					'scblocks.columns.htmlAttrControls',
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
