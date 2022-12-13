/**
 * WordPress dependencies
 */
import { PanelBody, ToggleControl } from '@wordpress/components';
import { addFilter } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';

/**
 * ScBlocks dependencies
 */
import { SelectHtmlTag } from '@scblocks/components';

import './add-shapes-panel';

addFilter(
	'scblocks.container.mainControls',
	'scblocks/container/mainControls',
	main
);

function main( controls, props ) {
	const { attributes, setAttributes } = props;
	const { tag, useThemeContentWidth } = attributes;
	return (
		<>
			<PanelBody opened>
				<SelectHtmlTag
					value={ tag }
					onChange={ ( value ) => setAttributes( { tag: value } ) }
				/>
			</PanelBody>
			<PanelBody opened>
				<ToggleControl
					label={ __( 'Use Theme Content Width', 'scblocks' ) }
					checked={ useThemeContentWidth }
					onChange={ ( value ) =>
						setAttributes( {
							useThemeContentWidth: value,
						} )
					}
				/>
			</PanelBody>
			{ controls }
		</>
	);
}
