/**
 * WordPress dependencies
 */
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { applyFilters } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';

/**
 * ScBlocks dependencies
 */
import { IdClassesControls, ControlsManager } from '@scblocks/block';
import { SelectHtmlTag } from '@scblocks/components';

import './add-shapes-panel';

export default function Inspector( props ) {
	const { attributes, setAttributes } = props;
	const { tag, useThemeContentWidth } = attributes;

	function setTag( value ) {
		setAttributes( { tag: value } );
	}
	return (
		<InspectorControls>
			<ControlsManager
				{ ...props }
				mainControls={ applyFilters(
					'scblocks.container.mainControls',
					<>
						<PanelBody opened>
							<SelectHtmlTag value={ tag } onChange={ setTag } />
						</PanelBody>
						<PanelBody opened>
							<ToggleControl
								label={ __(
									'Use Theme Content Width',
									'scblocks'
								) }
								checked={ useThemeContentWidth }
								onChange={ ( value ) =>
									setAttributes( {
										useThemeContentWidth: value,
									} )
								}
							/>
						</PanelBody>
					</>,
					props
				) }
				htmlAttrsControls={ applyFilters(
					'scblocks.container.htmlAttrControls',
					<PanelBody opened>
						<IdClassesControls { ...props } />
					</PanelBody>,
					props
				) }
			/>
		</InspectorControls>
	);
}
