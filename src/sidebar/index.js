/**
 * WordPress dependencies
 */
import { PluginSidebar, PluginSidebarMoreMenuItem } from '@wordpress/edit-post';
import { registerPlugin } from '@wordpress/plugins';
import { applyFilters } from '@wordpress/hooks';
import { useSelect } from '@wordpress/data';

/**
 * ScBlocks dependencies
 */
import {
	CORE_EDITOR_STORE_NAME,
	PLUGIN_NAME,
	STORE_NAME,
} from '@scblocks/constants';

/**
 * Internal dependencies
 */
import GoogleFonts from './google-fonts';

function Sidebar() {
	const isEditorRegistry = useSelect( ( store ) => {
		const editorRegistry = store( CORE_EDITOR_STORE_NAME );
		if ( editorRegistry ) {
			store( STORE_NAME ).getOptions();
			const isPage = editorRegistry.getCurrentPostType() === 'page';
			if ( isPage ) {
				store( STORE_NAME ).getPostSettings(
					editorRegistry.getCurrentPostId()
				);
			}
		}
		return !! editorRegistry;
	}, [] );

	if ( ! isEditorRegistry ) {
		return null;
	}

	return (
		<>
			<PluginSidebar
				name={ PLUGIN_NAME }
				title="ScBlocks"
				icon="admin-settings"
			>
				{ applyFilters( 'scblocks.sidebar.afterOpen' ) }
				<GoogleFonts />
				{ applyFilters( 'scblocks.sidebar.beforeClose' ) }
			</PluginSidebar>
			<PluginSidebarMoreMenuItem target={ PLUGIN_NAME }>
				{ 'ScBlocks' }
			</PluginSidebarMoreMenuItem>
		</>
	);
}
registerPlugin( PLUGIN_NAME, {
	render: Sidebar,
} );
