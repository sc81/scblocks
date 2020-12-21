/**
 * WordPress dependencies
 */
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import { applyFilters } from '@wordpress/hooks';

/**
 * ScBlocks dependencies
 */
import { IdClassesControls, ControlsManager } from '@scblocks/block';
import { SelectHtmlTag } from '@scblocks/components';

/**
 * Internal dependencies
 */
import ContentWidth from './content-width';

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
				mainControls={ applyFilters(
					'scblocks.container.mainControls',
					<PanelBody opened>
						<SelectHtmlTag value={ tag } onChange={ setTag } />
					</PanelBody>,
					props
				) }
				htmlAttrsControls={ applyFilters(
					'scblocks.container.htmlAttrControls',
					<PanelBody opened>
						<IdClassesControls { ...props } />
					</PanelBody>,
					props
				) }
				spacePanelAdditionalControls={ <ContentWidth { ...props } /> }
			/>
		</InspectorControls>
	);
}
