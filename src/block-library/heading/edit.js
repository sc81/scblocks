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

/**
 * Internal dependencies
 */
import DangerouslyPasteIcon from '../../components/dangerously-paste-icon';
import {
	HEADING_CLASS,
	HEADING_ICON_CLASS,
	HEADING_TEXT_CLASS,
	selectors,
	HEADING_ICON_SELECTOR,
} from './utils';
import { STORE_NAME } from '../../constants';
import { useBlockMemo } from '../../hooks/use-block-memo';
import useDynamicCss from '../../hooks/use-dynamic-css';
import ControlsManager from '../../components/controls-manager';
import IconPicker from '../../components/icon-picker';
import {
	useSelectorsActivity,
	setSelectorActivity,
} from '../../hooks/use-selector-activity';
import { removeSelectors } from '../../utils';

export default function Edit( props ) {
	const { attributes, setAttributes } = props;
	const { text, level, icon, iconPath, uidClass } = attributes;

	const devices = useSelect(
		( store ) => store( STORE_NAME ).getCurrentDevices(),
		[]
	);
	const blockMemo = useBlockMemo( attributes, selectors );
	useDynamicCss( props, devices, selectors );
	const selectorsActivity = useSelectorsActivity( selectors );

	useEffect( () => {
		setSelectorActivity(
			selectorsActivity,
			HEADING_ICON_SELECTOR,
			!! icon
		);
	}, [ selectorsActivity, icon ] );

	function onChangeIcon( value ) {
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
			selectors: [ HEADING_ICON_SELECTOR ],
		} );
	}

	const BlockWrapper = Block[ level ];

	return (
		<>
			<InspectorControls>
				<ControlsManager
					selectors={ selectors }
					setAttributes={ setAttributes }
					attributes={ attributes }
					devices={ devices }
					blockMemo={ blockMemo }
					selectorsActivity={ selectorsActivity }
					mainControls={
						<PanelBody opened>
							<SelectControl
								label={ __( 'Heading level' ) }
								value={ level }
								options={ [
									{ label: __( 'H1' ), value: 'h1' },
									{ label: __( 'H2' ), value: 'h2' },
									{ label: __( 'H3' ), value: 'h3' },
									{ label: __( 'H4' ), value: 'h4' },
									{ label: __( 'H5' ), value: 'h5' },
									{ label: __( 'H6' ), value: 'h6' },
								] }
								onChange={ ( value ) =>
									setAttributes( { level: value } )
								}
							/>
							<IconPicker
								label={ __( 'Icon' ) }
								iconPath={ iconPath }
								icon={ icon }
								onChange={ onChangeIcon }
								onClear={ onClear }
							/>
						</PanelBody>
					}
				/>
			</InspectorControls>
			<BlockWrapper className={ `${ HEADING_CLASS } ${ uidClass }` }>
				<DangerouslyPasteIcon
					icon={ icon }
					className={ HEADING_ICON_CLASS }
				/>
				<RichText
					className={ HEADING_TEXT_CLASS }
					tagName="span"
					value={ text }
					onChange={ ( value ) => setAttributes( { text: value } ) }
					placeholder={ __( 'Title' ) }
				/>
			</BlockWrapper>
		</>
	);
}