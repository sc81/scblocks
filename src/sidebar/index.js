/**
 * WordPress dependencies
 */
import { registerPlugin } from '@wordpress/plugins';
import { __ } from '@wordpress/i18n';
import { PluginSidebar, PluginSidebarMoreMenuItem } from '@wordpress/edit-post';

/**
 * Internal dependencies
 */
import { PLUGIN_NAME } from '../constants';
import Fonts from './fonts';

function Sidebar() {
	return (
		<>
			<PluginSidebar
				name={ PLUGIN_NAME }
				title={ __( 'ScBlocks controls' ) }
				icon="admin-settings"
			>
				<Fonts />
			</PluginSidebar>
			<PluginSidebarMoreMenuItem target={ PLUGIN_NAME }>
				{ __( 'ScBlocks controls' ) }
			</PluginSidebarMoreMenuItem>
		</>
	);
}
registerPlugin( PLUGIN_NAME, {
	render: Sidebar,
} );
