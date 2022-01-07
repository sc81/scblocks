import { isEmpty } from 'lodash';

/**
 * WordPress dependencies
 */
import { PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { applyFilters } from '@wordpress/hooks';
import { dispatch, useSelect } from '@wordpress/data';
import { useState } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';

/**
 * ScBlocks dependencies
 */
import { STORE_NAME } from '@scblocks/constants';
import { GoogleFontsControls, SaveButton } from '@scblocks/components';

const noticeText = {
	saving: __( 'Saving…', 'scblocks' ),
	saved: __( 'Saved!', 'scblocks' ),
	failed: __( 'Failed to save', 'scblocks' ),
};

function prepareFonts( fonts ) {
	const next = {};
	Object.keys( fonts ).forEach( ( id ) => {
		if ( ! isEmpty( fonts[ id ] ) ) {
			next[ id ] = fonts[ id ];
		}
	} );
	return next;
}

export default function GoogleFonts() {
	const { googleFonts, siteGoogleFonts } = useSelect( ( store ) => {
		return {
			googleFonts: store( STORE_NAME ).getGoogleFonts(),
			siteGoogleFonts: store( STORE_NAME ).getSiteGoogleFonts(),
		};
	}, [] );
	const [ isSaving, setIsSaving ] = useState( false );
	const [ notice, setNotice ] = useState( '' );
	const [ isModified, setIsModified ] = useState( false );

	function setFontsData( value ) {
		dispatch( STORE_NAME ).setSiteGoogleFonts( value );
		setIsModified( true );
	}

	function save() {
		setIsSaving( true );
		setNotice( noticeText.saving );

		apiFetch( {
			path: '/scblocks/v1/site-google-fonts',
			method: 'POST',
			data: { fonts: prepareFonts( siteGoogleFonts ) },
		} )
			.then( () => {
				setIsSaving( false );
				setNotice( noticeText.saved );
				hideNotice();
				setIsModified( false );
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

	return (
		<PanelBody title={ __( 'Google Fonts', 'scblocks' ) }>
			{ applyFilters(
				'scblocks.sidebar.googleFonts',
				<>
					<GoogleFontsControls
						fontsData={ siteGoogleFonts }
						googleFonts={ googleFonts }
						setFontsData={ setFontsData }
					/>
					<SaveButton
						isDisabled={
							isSaving ||
							isEmpty( siteGoogleFonts ) ||
							! isModified
						}
						onClick={ () => save() }
						notice={ notice }
					/>
				</>
			) }
		</PanelBody>
	);
}
