import { isEmpty } from 'lodash';

/**
 * WordPress dependencies
 */
import { PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { applyFilters } from '@wordpress/hooks';
import { dispatch, select, useSelect } from '@wordpress/data';
import { useState } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';

/**
 * ScBlocks dependencies
 */
import { OPTIONS_REST_API_PATH, STORE_NAME } from '@scblocks/constants';
import { GoogleFontsControls, SaveButton } from '@scblocks/components';

const noticeText = {
	saving: __( 'Saving…', 'scblocks' ),
	saved: __( 'Saved!', 'scblocks' ),
	failed: __( 'Failed to save', 'scblocks' ),
};

const OPTION_NAME = 'google_fonts';

let isSaved = true;

export default function GoogleFonts() {
	const { googleFonts, siteGoogleFonts } = useSelect( ( store ) => {
		return {
			googleFonts: store( STORE_NAME ).getGoogleFonts(),
			siteGoogleFonts: store( STORE_NAME ).getOption( OPTION_NAME ),
		};
	}, [] );
	const [ isSaving, setIsSaving ] = useState( false );
	const [ notice, setNotice ] = useState( '' );
	const [ isModified, setIsModified ] = useState( ! isSaved );

	function setFontsData( value ) {
		dispatch( STORE_NAME ).setOption( OPTION_NAME, value );
		setIsModified( true );
		isSaved = false;
	}

	function save() {
		setIsSaving( true );
		setNotice( noticeText.saving );

		apiFetch( {
			path: OPTIONS_REST_API_PATH,
			method: 'POST',
			data: {
				options: {
					[ OPTION_NAME ]:
						select( STORE_NAME ).getOption( OPTION_NAME ),
				},
			},
		} )
			.then( () => {
				setIsSaving( false );
				setNotice( noticeText.saved );
				hideNotice();
				setIsModified( false );
				isSaved = true;
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
