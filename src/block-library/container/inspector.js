/**
 * WordPress dependencies
 */
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
/**
 * Internal dependencies
 */
import ControlsManager from '../../components/controls-manager';
import SelectHtmlTag from '../../components/select-html-tag';
import { selectorsSettings } from './utils';
import ContentWidth from './content-width';
import IdClassesControls from '../../block/id-classes-controls.js';

export default function Inspector( props ) {
	const {
		attributes: { tag },
		setAttributes,
	} = props;
	function setTag( value ) {
		setAttributes( { tag: value } );
	}
	return (
		<InspectorControls>
			<ControlsManager
				{ ...props }
				selectorsSettings={ selectorsSettings }
				mainControls={
					<PanelBody opened>
						<IdClassesControls { ...props } />
						<SelectHtmlTag value={ tag } onChange={ setTag } />
					</PanelBody>
				}
				spacePanelAdditionalControls={ <ContentWidth { ...props } /> }
			/>
		</InspectorControls>
	);
}