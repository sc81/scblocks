/**
 * WordPress dependencies
 */
import {
	InspectorControls,
	RichText,
	__experimentalBlock as Block,
} from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { useEffect } from '@wordpress/element';
import { createBlock } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import DangerouslyPasteIcon from '../../components/dangerously-paste-icon';
import { selectorsSettings } from './utils';
import { useBlockMemo } from '../../hooks/use-block-memo';
import useDynamicCss from '../../hooks/use-dynamic-css';
import ControlsManager from '../../components/controls-manager';
import IconPicker from '../../components/icon-picker';
import {
	useSelectorsActivity,
	setSelectorActivity,
} from '../../hooks/use-selector-activity';
import { removeSelectors } from '../../utils';
import { CORE_EDIT_POST_STORE_NAME } from '../../constants';
import { name as blockName } from '.';
import { SELECTORS, BLOCK_CLASSES } from '../../block/constants';

export default function Edit( props ) {
	const { attributes, setAttributes, onReplace } = props;
	const { text, level, icon, iconPath, uidClass } = attributes;

	const devices = useSelect(
		( select ) =>
			select(
				CORE_EDIT_POST_STORE_NAME
			).__experimentalGetPreviewDeviceType(),
		[]
	);
	const blockMemo = useBlockMemo( attributes, selectorsSettings );
	useDynamicCss( props, devices );
	const selectorsActivity = useSelectorsActivity( selectorsSettings );

	useEffect( () => {
		setSelectorActivity(
			selectorsActivity,
			SELECTORS.heading.icon.alias,
			!! icon
		);
	}, [ selectorsActivity, icon ] );

	function onSelectIcon( value ) {
		setAttributes( {
			icon: value.icon,
			iconPath: value.iconPath,
		} );
	}
	function onClear() {
		setAttributes( {
			icon: '',
			iconPath: '',
		} );
		removeSelectors( {
			attributes,
			setAttributes,
			selectors: [ SELECTORS.heading.icon.alias ],
		} );
	}

	const BlockWrapper = Block[ level ];

	return (
		<>
			<InspectorControls>
				<ControlsManager
					selectorsSettings={ selectorsSettings }
					setAttributes={ setAttributes }
					attributes={ attributes }
					devices={ devices }
					blockMemo={ blockMemo }
					selectorsActivity={ selectorsActivity }
					mainControls={
						<PanelBody opened>
							<SelectControl
								label={ __( 'Heading level', 'scblocks' ) }
								value={ level }
								options={ [
									{
										label: __( 'H1', 'scblocks' ),
										value: 'h1',
									},
									{
										label: __( 'H2', 'scblocks' ),
										value: 'h2',
									},
									{
										label: __( 'H3', 'scblocks' ),
										value: 'h3',
									},
									{
										label: __( 'H4', 'scblocks' ),
										value: 'h4',
									},
									{
										label: __( 'H5', 'scblocks' ),
										value: 'h5',
									},
									{
										label: __( 'H6', 'scblocks' ),
										value: 'h6',
									},
								] }
								onChange={ ( value ) =>
									setAttributes( { level: value } )
								}
							/>
							<IconPicker
								label={ __( 'Icon', 'scblocks' ) }
								iconPath={ iconPath }
								icon={ icon }
								onSelect={ onSelectIcon }
								onClear={ onClear }
							/>
						</PanelBody>
					}
				/>
			</InspectorControls>
			<BlockWrapper
				className={ `${ BLOCK_CLASSES.heading.main } ${ uidClass }` }
			>
				<DangerouslyPasteIcon
					icon={ icon }
					className={ BLOCK_CLASSES.heading.icon }
				/>
				<RichText
					className={ BLOCK_CLASSES.heading.text }
					tagName="span"
					value={ text }
					onChange={ ( value ) => setAttributes( { text: value } ) }
					placeholder={ __( 'Title', 'scblocks' ) }
					onSplit={ ( value ) => {
						if ( ! value ) {
							return createBlock( 'core/paragraph' );
						}

						return createBlock( blockName, {
							...attributes,
							text: value,
						} );
					} }
					onReplace={ onReplace }
				/>
			</BlockWrapper>
		</>
	);
}
