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
	const { attributes, setAttributes } = props;

	return (
		<InspectorControls>
			<ControlsManager
				{ ...props }
				mainControls={ applyFilters(
					'scblocks.column.mainControls',
					null,
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
			/>
		</InspectorControls>
	);
}
