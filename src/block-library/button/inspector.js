/**
 * WordPress dependencies
 */
import { PanelBody, TextControl, ToggleControl } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { applyFilters } from '@wordpress/hooks';
import { useSelect, dispatch, select } from '@wordpress/data';

/**
 * ScBlocks dependencies
 */
import {
	BLOCK_SELECTOR,
	IdClassesControls,
	ControlsManager,
	getIconAttrs,
} from '@scblocks/block';
import { removeSelectors } from '@scblocks/css-utils';
import { IconPicker } from '@scblocks/components';
import { STORE_NAME } from '@scblocks/constants';

export default function Inspector( props ) {
	const { attributes, setAttributes } = props;
	const { iconId, withoutText, ariaLabel } = attributes;
	const icon = useSelect(
		( store ) => {
			const icons = store( STORE_NAME ).usedIcons();
			if ( icons && icons[ iconId ] ) {
				return icons[ iconId ];
			}
			return '';
		},
		[ iconId ]
	);

	function onClearIcon() {
		setAttributes( {
			iconId: '',
			iconHtml: '',
			iconName: '',
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
		const icons = select( STORE_NAME ).usedIcons();
		const iconAttrs = getIconAttrs( name, iconAsString, icons );
		setAttributes( iconAttrs );
		if ( iconAttrs.iconHtml ) {
			dispatch( STORE_NAME ).addUsedIcon(
				iconAttrs.iconId,
				iconAsString
			);
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
							icon={ iconId }
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
