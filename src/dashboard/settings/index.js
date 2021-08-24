// styles
import './index.scss';

/**
 * WordPress dependencies
 */
import apiFetch from '@wordpress/api-fetch';
import { useSelect, dispatch, select } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { render, useState } from '@wordpress/element';
import { applyFilters } from '@wordpress/hooks';
import domReady from '@wordpress/dom-ready';
import {
	Button,
	PanelBody,
	Placeholder,
	Spinner,
	CheckboxControl,
	SelectControl,
} from '@wordpress/components';
/**
 * ScBlocks dependencies.
 */
import { PLUGIN_NAME, STORE_NAME } from '@scblocks/constants';

const noticeText = {
	saving: __( 'Saving…', 'scblocks' ),
	failed: __( 'Failed to save', 'scblocks' ),
};

function Settings() {
	const [ isSaving, setIsSaving ] = useState( false );
	const [ notice, setNotice ] = useState( '' );
	const { cssPrintMethod, regenerateCss, isLoaded } = useSelect(
		( store ) => {
			const settings = store( STORE_NAME ).getSettings();
			return {
				cssPrintMethod: settings?.css_print_method || '',
				regenerateCss: settings?.force_regenerate_css_files || '',
				isLoaded: !! settings,
			};
		}
	);
	function onChangeOption( name, value ) {
		dispatch( STORE_NAME ).setOption( name, value );
	}
	function updateSettings() {
		setIsSaving( true );
		setNotice( noticeText.saving );

		apiFetch( {
			path: `/${ PLUGIN_NAME }/v1/settings`,
			method: 'POST',
			data: {
				settings: select( STORE_NAME ).getSettings(),
			},
		} )
			.then( ( response ) => {
				setIsSaving( false );
				setNotice( response.text );
				hideNotice();
			} )
			.catch( () => {
				setIsSaving( false );
				setNotice( noticeText.failed );
				hideNotice();
			} );
	}
	function hideNotice() {
		setTimeout( () => setNotice( '' ), 3000 );
	}
	if ( ! isLoaded ) {
		return (
			<Placeholder className="scblocks-settings-placeholder">
				<Spinner />
			</Placeholder>
		);
	}
	return (
		<>
			{ applyFilters( 'scblocks.dashboard.beforeSettings', '' ) }
			<PanelBody title={ __( 'Settings', 'scblocks' ) }>
				<SelectControl
					label={ __( 'CSS Print Method', 'scblocks' ) }
					value={ cssPrintMethod }
					options={ [
						{
							label: __( 'External File', 'scblocks' ),
							value: 'file',
						},
						{
							label: __( 'Inline Embedding', 'scblocks' ),
							value: 'inline',
						},
					] }
					onChange={ ( value ) =>
						onChangeOption( 'css_print_method', value )
					}
				/>
				<CheckboxControl
					label={ __( 'Regenerate CSS', 'scblocks' ) }
					help={ __(
						'Force your external CSS files to regenerate next time their page is loaded.',
						'scblocks'
					) }
					checked={ '1' === regenerateCss }
					onChange={ ( value ) =>
						onChangeOption(
							'force_regenerate_css_files',
							value ? '1' : '0'
						)
					}
				/>
				<div className="scblocks-save-settings">
					<Button
						isPrimary
						disabled={ isSaving }
						onClick={ updateSettings }
					>
						{ __( 'Save', 'scblocks' ) }
					</Button>
					<div className={ notice ? '' : 'display-none' }>
						{ notice }
					</div>
				</div>
			</PanelBody>
			{ applyFilters( 'scblocks.dashboard.afterSettings', '' ) }
		</>
	);
}

domReady( () => {
	render(
		<Settings />,
		document.getElementById( 'scblocks-settings-controls' )
	);
} );
