/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import {
	KeyboardShortcuts,
	ToolbarButton,
	ToolbarGroup,
	Popover,
	TextControl,
} from '@wordpress/components';
import {
	BlockControls,
	__experimentalLinkControl as LinkControl,
} from '@wordpress/block-editor';
import { rawShortcut, displayShortcut } from '@wordpress/keycodes';
import { link, linkOff } from '@wordpress/icons';

export default function URLPicker( {
	isSelected,
	attributes: { url, target, relSponsored, relNoFollow, ariaLabel },
	setAttributes,
	displayAriaLabelControl,
} ) {
	const [ isURLPickerOpen, setIsURLPickerOpen ] = useState( false );
	const urlIsSet = !! url;
	const urlIsSetAndSelected = urlIsSet && isSelected;
	const openLinkControl = () => {
		setIsURLPickerOpen( true );
		return false; // prevents default behaviour for event
	};
	const unlinkButton = () => {
		setAttributes( {
			url: undefined,
			target: false,
			relNoFollow: false,
			relSponsored: false,
		} );
		setIsURLPickerOpen( false );
	};
	const linkControl = ( isURLPickerOpen || urlIsSetAndSelected ) && (
		<Popover
			position="bottom center"
			onClose={ () => setIsURLPickerOpen( false ) }
		>
			<LinkControl
				className="wp-block-navigation-link__inline-link-input"
				value={ { url, target, relNoFollow, relSponsored } }
				onChange={ ( {
					url: newURL = '',
					target: newTarget,
					relNoFollow: newRelNoFollow,
					relSponsored: newRelSponsored,
				} ) => {
					setAttributes( {
						url: newURL,
						target: newTarget,
						relNoFollow: newRelNoFollow,
						relSponsored: newRelSponsored,
					} );
				} }
				settings={ [
					{
						id: 'target',
						title: __( 'Open link in a new tab', 'scblocks' ),
					},
					{
						id: 'relNoFollow',
						title: __( 'Add rel="nofollow"', 'scblocks' ),
					},
					{
						id: 'relSponsored',
						title: __( 'Add rel="sponsored"', 'scblocks' ),
					},
				] }
				renderControlBottom={
					displayAriaLabelControl
						? () => (
								<div className="block-editor-link-control__tools">
									<TextControl
										label={ __( 'ARIA Label', 'scblocks' ) }
										value={ ariaLabel }
										onChange={ ( value ) => {
											setAttributes( {
												ariaLabel: value,
											} );
										} }
										autoComplete="off"
									/>
								</div>
						  )
						: undefined
				}
			/>
		</Popover>
	);
	return (
		<>
			<BlockControls>
				<ToolbarGroup>
					{ ! urlIsSet && (
						<ToolbarButton
							name="link"
							icon={ link }
							title={ __( 'Link', 'scblocks' ) }
							shortcut={ displayShortcut.primary( 'k' ) }
							onClick={ openLinkControl }
						/>
					) }
					{ urlIsSetAndSelected && (
						<ToolbarButton
							name="link"
							icon={ linkOff }
							title={ __( 'Unlink', 'scblocks' ) }
							shortcut={ displayShortcut.primaryShift( 'k' ) }
							onClick={ unlinkButton }
							isActive={ true }
						/>
					) }
				</ToolbarGroup>
			</BlockControls>
			{ isSelected && (
				<KeyboardShortcuts
					bindGlobal
					shortcuts={ {
						[ rawShortcut.primary( 'k' ) ]: openLinkControl,
						[ rawShortcut.primaryShift( 'k' ) ]: unlinkButton,
					} }
				/>
			) }
			{ linkControl }
		</>
	);
}
