/**
 * WordPress dependencies
 */
import { PanelBody } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';
import { applyFilters } from '@wordpress/hooks';

/**
 * Internal dependencies
 */
import ControlsManager from '../controls-manager';
import IdClassesControls from '../id-classes-controls';

export default function Inspector( props ) {
	const { isSelected, name } = props;
	if ( ! isSelected ) return null;
	const blockName = name.replace( '/', '.' );
	return (
		<InspectorControls>
			<ControlsManager
				{ ...props }
				mainControls={ applyFilters(
					`${ blockName }.mainControls`,
					null,
					props
				) }
				htmlAttrsControls={ applyFilters(
					`${ blockName }.htmlAttrControls`,
					<PanelBody opened>
						<IdClassesControls { ...props } />
					</PanelBody>,
					props
				) }
			/>
		</InspectorControls>
	);
}
