/**
 * WordPress dependencies
 */
import { PanelBody, TextControl, ToggleControl } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { applyFilters } from '@wordpress/hooks';
import { dispatch } from '@wordpress/data';

/**
 * ScBlocks dependencies
 */
import {
	BLOCK_SELECTOR,
	IdClassesControls,
	ControlsManager,
	getIconAttrs,
	useGetIcon,
} from '@scblocks/block';
import { removeSelectors } from '@scblocks/css-utils';
import { IconPicker } from '@scblocks/components';
import { STORE_NAME } from '@scblocks/constants';

export default function Inspector( props ) {
	const { attributes, setAttributes } = props;
	const { iconId, iconPostId, withoutText, ariaLabel } = attributes;
	const icon = useGetIcon( iconId, iconPostId );

	function onClearIcon() {
		setAttributes( {
			iconId: '',
			iconHtml: '',
			iconName: '',
			iconPostId: '',
			withoutText: false,
			ariaLabel: '',
		} );
		removeSelectors( {
			attributes,
			setAttributes,
			selectors: [ BLOCK_SELECTOR.button.icon.alias ],
		} );
	}
	function onSelectIcon( name, iconAsString ) {
		if ( ! iconAsString ) {
			onClearIcon();
			return;
		}
		const iconAttrs = getIconAttrs( name, iconAsString );
		setAttributes( iconAttrs );
		if ( iconAttrs.iconHtml ) {
			dispatch( STORE_NAME ).addIcon( iconAttrs.iconId, iconAsString );
		}
	}

	return (
		<InspectorControls>
			<ControlsManager
				{ ...props }
				mainControls={ applyFilters(
					'scblocks.button.mainControls',
					<PanelBody opened>
						<IconPicker
							icon={ icon }
							onSelect={ onSelectIcon }
							onClear={ onClearIcon }
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
						{ withoutText && (
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
						) }
					</PanelBody>,
					props
				) }
			/>
		</InspectorControls>
	);
}
