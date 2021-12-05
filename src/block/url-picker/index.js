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
	Button,
} from '@wordpress/components';
import {
	BlockControls,
	__experimentalLinkControl as LinkControl,
} from '@wordpress/block-editor';
import { rawShortcut, displayShortcut } from '@wordpress/keycodes';
import { link } from '@wordpress/icons';

export default function URLPicker( {
	isSelected,
	attributes: { url, target, relSponsored, relNoFollow, ariaLabel },
	setAttributes,
} ) {
	const [ isURLPickerOpen, setIsURLPickerOpen ] = useState( false );
	const urlIsSet = !! url;

	function openLinkControl() {
		setIsURLPickerOpen( true );
		return false; // prevents default behaviour for event
	}
	function closeLinkControl() {
		setIsURLPickerOpen( false );
		return false; // prevents default behaviour for event
	}

	return (
		<>
			<BlockControls>
				<ToolbarGroup>
					{ ! isURLPickerOpen && (
						<ToolbarButton
							name="link"
							icon={ link }
							title={ __( 'Show Link Controls', 'scblocks' ) }
							shortcut={ displayShortcut.primary( 'k' ) }
							onClick={ openLinkControl }
							isActive={ urlIsSet }
						/>
					) }
					{ isURLPickerOpen && (
						<ToolbarButton
							name="link"
							icon={ link }
							title={ __( 'Hide Link Controls', 'scblocks' ) }
							shortcut={ displayShortcut.primaryShift( 'k' ) }
							onClick={ closeLinkControl }
							isActive={ urlIsSet }
						/>
					) }
				</ToolbarGroup>
			</BlockControls>
			{ isSelected && (
				<KeyboardShortcuts
					bindGlobal
					shortcuts={ {
						[ rawShortcut.primary( 'k' ) ]: openLinkControl,
						[ rawShortcut.primaryShift( 'k' ) ]: closeLinkControl,
					} }
				/>
			) }
			{ isURLPickerOpen && (
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
								ariaLabel,
							} );
						} }
						settings={ [
							{
								id: 'target',
								title: __(
									'Open link in a new tab',
									'scblocks'
								),
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
						renderControlBottom={ () => (
							<div className="block-editor-link-control__tools">
								<TextControl
									label={ __( 'Aria Label', 'scblocks' ) }
									value={ ariaLabel }
									onChange={ ( value ) => {
										setAttributes( {
											ariaLabel: value,
										} );
									} }
									autoComplete="off"
								/>
							</div>
						) }
					/>
					<div className="block-editor-link-control__tools scblocks-link-control-buttons">
						<Button
							isSecondary
							onClick={ () => {
								setIsURLPickerOpen( false );
								if ( ! url ) {
									setAttributes( {
										target: false,
										relNoFollow: false,
										relSponsored: false,
										ariaLabel: '',
									} );
								}
							} }
						>
							{ __( 'Close', 'scblocks' ) }
						</Button>
						<Button
							isSecondary
							onClick={ () => {
								setAttributes( {
									url: '',
									target: false,
									relNoFollow: false,
									relSponsored: false,
									ariaLabel: '',
								} );
								setIsURLPickerOpen( false );
							} }
						>
							{ __( 'Clear and Close', 'scblocks' ) }
						</Button>
					</div>
				</Popover>
			) }
		</>
	);
}
