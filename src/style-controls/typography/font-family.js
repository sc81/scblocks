/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { TextControl, DropdownMenu } from '@wordpress/components';
import { useMemo } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { applyFilters } from '@wordpress/hooks';

/**
 * ScBlocks dependencies
 */
import { ControlWrapper } from '@scblocks/components';
import { STORE_NAME } from '@scblocks/constants';

function buildControls( fonts, onChange ) {
	const options = [
		{
			title: 'System Font',
			onClick: () =>
				onChange(
					"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif"
				),
		},
	];
	Object.keys( fonts ).forEach( ( fontId ) => {
		if ( fonts[ fontId ].name ) {
			options.push( {
				title: `Google Font - ${ fonts[ fontId ].name } ( ${ fontId } font )`,
				onClick: () =>
					onChange( `var(--scblocks-${ fontId }-google-font)` ),
			} );
		}
	} );
	return options;
}

const OPTION_NAME = 'google_fonts';

export default function FontFamily( { value, onChange, onClear } ) {
	const siteGoogleFonts = useSelect( ( store ) => {
		return store( STORE_NAME ).getOption( OPTION_NAME );
	}, [] );
	const controls = useMemo( () => {
		const options = buildControls( siteGoogleFonts, onChange );
		return applyFilters(
			'scblocks.fontFamily.dropdownFontControls',
			options,
			siteGoogleFonts,
			buildControls,
			onChange
		);
	}, [ siteGoogleFonts, onChange ] );
	return (
		<ControlWrapper
			label={ __( 'Font Family', 'scblocks' ) }
			withoutSelectDevices
			displayClearButton={ !! value }
			onClear={ onClear }
			extraControls={
				<DropdownMenu
					icon="ellipsis"
					label={ __( 'Choose a font', 'scblocks' ) }
					controls={ controls }
				/>
			}
		>
			<TextControl
				value={ value }
				onChange={ onChange }
				autocomplete="off"
			/>
		</ControlWrapper>
	);
}
