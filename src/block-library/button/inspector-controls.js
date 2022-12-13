/**
 * WordPress dependencies
 */
import { PanelBody, TextControl, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';

/**
 * ScBlocks dependencies
 */
import { SELEKTORY, SelectIcon } from '@scblocks/block';

addFilter(
	'scblocks.button.mainControls',
	'scblocks/button/mainControls',
	main
);

function main( controls, props ) {
	const { attributes, setAttributes } = props;
	const { icon, withoutText } = attributes;
	return (
		<>
			<PanelBody opened>
				<SelectIcon
					{ ...props }
					iconSelector={ SELEKTORY.button.icon.alias }
					iconSvgSelector={ SELEKTORY.button.iconSvg.alias }
					afterRemoveIcon={ () =>
						setAttributes( {
							withoutText: false,
						} )
					}
				/>
				{ !! icon && (
					<ToggleControl
						label={ __( 'Without text', 'scblocks' ) }
						checked={ withoutText }
						onChange={ ( value ) => {
							setAttributes( { withoutText: value } );
							if ( ! value ) {
								setAttributes( { ariaLabel: '' } );
							}
						} }
					/>
				) }
			</PanelBody>
			{ controls }
		</>
	);
}

addFilter(
	'scblocks.button.htmlAttrControls',
	'scblocks/button/htmlAttrControls',
	attrs
);

function attrs( controls, props ) {
	const { attributes, setAttributes } = props;
	const { ariaLabel, target, relNoFollow, relSponsored } = attributes;
	return (
		<>
			{ controls }
			<PanelBody opened>
				<ToggleControl
					label={ __(
						'Open link in a new tab (target="_blank")',
						'scblocks'
					) }
					checked={ target }
					onChange={ ( value ) => {
						setAttributes( { target: value } );
					} }
				/>
				<ToggleControl
					label={ __( 'Add rel="nofollow"', 'scblocks' ) }
					checked={ relNoFollow }
					onChange={ ( value ) => {
						setAttributes( { relNoFollow: value } );
					} }
				/>
				<ToggleControl
					label={ __( 'Add rel="sponsored"', 'scblocks' ) }
					checked={ relSponsored }
					onChange={ ( value ) => {
						setAttributes( { relSponsored: value } );
					} }
				/>
				<TextControl
					label={ __( 'ARIA Label', 'scblocks' ) }
					help={ __(
						'Describe the purpose of the button. This is useful for people who use screen readers when the button has no text.',
						'scblocks'
					) }
					value={ ariaLabel }
					onChange={ ( value ) => {
						setAttributes( {
							ariaLabel: value,
						} );
					} }
				/>
			</PanelBody>
		</>
	);
}
