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
import { selectors } from './utils';
import { ALL_DEVICES } from '../../constants';
import { BUTTON_SELECTOR } from '../button/utils';

export default function Inspector( {
	attributes,
	setAttributes,
	devices,
	blockMemo,
} ) {
	const justifyContent = getPropValue( {
		attributes,
		devices: ALL_DEVICES,
		selector: BUTTON_SELECTOR,
		propName: 'justifyContent',
	} );
	function setAlignment( value ) {
		setPropValue( {
			attributes,
			setAttributes,
			devices: ALL_DEVICES,
			selector: BUTTON_SELECTOR,
			propName: 'justifyContent',
			value: value + '',
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
					<PanelBody opened>
						<SelectControl
							label={ __( 'Buttons alignment' ) }
							value={ justifyContent }
							options={ [
								{ label: __( 'Default' ), value: '' },
								{
									label: __( 'Left' ),
									value: 'flex-start',
								},
								{ label: __( 'Center' ), value: 'center' },
								{ label: __( 'Right' ), value: 'flex-end' },
							] }
							onChange={ setAlignment }
						/>
					</PanelBody>
				}
			/>
		</InspectorControls>
	);
}
