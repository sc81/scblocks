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

export default function Inspector( props ) {
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
						<IdClassesControls { ...props } />
					</PanelBody>,
					props
				) }
			/>
		</InspectorControls>
	);
}
