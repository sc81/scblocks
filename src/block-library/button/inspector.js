/**
 * WordPress dependencies
 */
import { PanelBody, TextControl, ToggleControl } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { applyFilters } from '@wordpress/hooks';

/**
 * ScBlocks dependencies
 */
import {
	SELEKTORY,
	IdClassesControls,
	ControlsManager,
	SelectIcon,
} from '@scblocks/block';

export default function Inspector( props ) {
	const { attributes, setAttributes } = props;
	const { icon, withoutText, ariaLabel, target, relNoFollow, relSponsored } =
		attributes;

	function afterRemoveIcon() {
		setAttributes( {
			withoutText: false,
		} );
	}

	return (
		<InspectorControls>
			<ControlsManager
				{ ...props }
				mainControls={ applyFilters(
					'scblocks.button.mainControls',
					<PanelBody opened>
						<SelectIcon
							{ ...props }
							iconSelector={ SELEKTORY.button.icon.alias }
							iconSvgSelector={ SELEKTORY.button.iconSvg.alias }
							afterRemoveIcon={ afterRemoveIcon }
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
					</PanelBody>,
					props
				) }
				htmlAttrsControls={ applyFilters(
					'scblocks.button.htmlAttrControls',
					<PanelBody opened>
						<IdClassesControls
							attributes={ attributes }
							setAttributes={ setAttributes }
						/>
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
					</PanelBody>,
					props
				) }
			/>
		</InspectorControls>
	);
}
