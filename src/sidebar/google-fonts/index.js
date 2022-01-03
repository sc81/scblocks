/**
 * WordPress dependencies
 */
import { PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { applyFilters } from '@wordpress/hooks';
import { dispatch, useSelect } from '@wordpress/data';

/**
 * ScBlocks dependencies
 */
import { STORE_NAME } from '@scblocks/constants';

/**
 * Internal dependencies
 */
import Fonts from './fonts';

export default function GoogleFonts() {
	const { googleFonts, siteGoogleFonts } = useSelect( ( store ) => {
		return {
			googleFonts: store( STORE_NAME ).getGoogleFonts(),
			siteGoogleFonts: store( STORE_NAME ).getSiteGoogleFonts(),
		};
	}, [] );

	function setFontsData( value ) {
		dispatch( STORE_NAME ).setSiteGoogleFonts( value );
	}

	return (
		<PanelBody label={ __( 'Google Fonts', 'scblocks' ) }>
			{ applyFilters(
				'scblocks.sidebar.googleFonts',
				<Fonts
					fontsData={ siteGoogleFonts }
					googleFonts={ googleFonts }
					setFontsData={ setFontsData }
				/>,
				googleFonts,
				siteGoogleFonts,
				Fonts
			) }
		</PanelBody>
	);
}
