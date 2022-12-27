/**
 * WordPress dependencies
 */
import { PanelBody, TabPanel } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';
import { applyFilters } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';

/**
 * ScBlocks dependencies
 */
import { PLUGIN_NAME } from '@scblocks/constants';
import { getLastActivePanel, setLastActivePanel } from '@scblocks/css-utils';
import { StyleControls } from '@scblocks/style-controls';

/**
 * Internal dependencies
 */
import IdClassesControls from '../id-classes-controls';

const tabs = [
	{
		name: 'main',
		title: __( 'Main', 'scblocks' ),
	},
	{
		name: 'style',
		title: __( 'Style', 'scblocks' ),
	},
	{
		name: 'attributes',
		title: __( 'Attributes', 'scblocks' ),
	},
];

function Main( props ) {
	return applyFilters( `${ props.blockName }.mainControls`, null, props );
}

function Attrs( props ) {
	return applyFilters(
		`${ props.blockName }.htmlAttrControls`,
		<PanelBody opened>
			<IdClassesControls { ...props } />
		</PanelBody>,
		props
	);
}

export default function Inspector( props ) {
	const { isSelected, name, blockMemo } = props;
	if ( ! isSelected ) return null;
	const blockName = name.replace( '/', '.' );

	function onSelect( panelName ) {
		setLastActivePanel( blockMemo, 'tabPanel', panelName );
	}

	return (
		<InspectorControls>
			<TabPanel
				className={ `${ PLUGIN_NAME }-components-tabs` }
				initialTabName={ getLastActivePanel( blockMemo ).tabPanel }
				onSelect={ onSelect }
				tabs={ tabs }
			>
				{ ( tab ) => {
					return (
						<div
							className={ `${ PLUGIN_NAME }-components-tab-panel__tab-wrapper` }
							data-style={ tab.name === 'style' }
						>
							{ tab.name === 'main' && (
								<Main { ...props } blockName={ blockName } />
							) }
							{ tab.name === 'style' && (
								<StyleControls { ...props } />
							) }
							{ tab.name === 'attributes' && (
								<Attrs { ...props } blockName={ blockName } />
							) }
						</div>
					);
				} }
			</TabPanel>
		</InspectorControls>
	);
}
