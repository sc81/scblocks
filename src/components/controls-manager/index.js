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

export default function ControlsManager( { mainControls, ...rest } ) {
	const { blockMemo } = rest;

	function onSelect( name ) {
		setLastActivePanel( blockMemo, 'tabPanel', name );
	}
	if ( ! mainControls ) {
		return <StyleControls { ...rest } />;
	}

	return (
		<TabPanel
			className={ `${ PLUGIN_NAME }-components-tabs` }
			initialTabName={ getLastActivePanel( blockMemo ).tabPanel }
			onSelect={ onSelect }
			tabs={ [
				{
					name: 'main',
					title: __( 'Main' ),
				},
				{
					name: 'style',
					title: __( 'Style' ),
				},
			] }
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
					</div>
				);
			} }
		</TabPanel>
	);
}
