/**
 * WordPress dependencies
 */
import { TabPanel } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { PLUGIN_NAME } from '../../constants';
import { StyleControls } from '../../style-controls';
import {
	getLastActivePanel,
	setLastActivePanel,
} from '../../hooks/use-block-memo';

export default function ControlsManager( {
	mainControls,
	htmlAttrsControls,
	...rest
} ) {
	const { blockMemo } = rest;

	function onSelect( name ) {
		setLastActivePanel( blockMemo, 'tabPanel', name );
	}
	if ( ! mainControls && ! htmlAttrsControls ) {
		return <StyleControls { ...rest } />;
	}
	const tabs = [
		{
			name: 'style',
			title: __( 'Style', 'scblocks' ),
		},
	];
	if ( mainControls ) {
		tabs.unshift( {
			name: 'main',
			title: __( 'Main', 'scblocks' ),
		} );
	}
	if ( htmlAttrsControls ) {
		tabs.push( {
			name: 'attributes',
			title: __( 'Attributes', 'scblocks' ),
		} );
	}

	return (
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
						{ tab.name === 'main' && mainControls }
						{ tab.name === 'style' && (
							<StyleControls { ...rest } />
						) }
						{ tab.name === 'attributes' && htmlAttrsControls }
					</div>
				);
			} }
		</TabPanel>
	);
}
