/**
 * WordPress dependencies
 */
import { SelectControl, PanelBody } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import ControlsManager from '../../components/controls-manager';
import { setPropValue, getPropValue } from '../../utils';
import { selectorsSettings } from './utils';
import { ALL_DEVICES } from '../../constants';
import { SELECTORS } from '../../block/constants';

export default function Inspector( {
	attributes,
	setAttributes,
	devices,
	blockMemo,
} ) {
	const justifyContent = getPropValue( {
		attributes,
		devices: ALL_DEVICES,
		selector: SELECTORS.blockMainSelectorAlias,
		propName: 'justifyContent',
	} );
	function setAlignment( value ) {
		setPropValue( {
			attributes,
			setAttributes,
			devices: ALL_DEVICES,
			selector: SELECTORS.blockMainSelectorAlias,
			propName: 'justifyContent',
			value: value + '',
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
						<SelectControl
							label={ __( 'Buttons alignment', 'scblocks' ) }
							value={ justifyContent }
							options={ [
								{
									label: __( 'Default', 'scblocks' ),
									value: '',
								},
								{
									label: __( 'Left', 'scblocks' ),
									value: 'flex-start',
								},
								{
									label: __( 'Center', 'scblocks' ),
									value: 'center',
								},
								{
									label: __( 'Right', 'scblocks' ),
									value: 'flex-end',
								},
							] }
							onChange={ setAlignment }
						/>
					</PanelBody>
				}
			/>
		</InspectorControls>
	);
}
