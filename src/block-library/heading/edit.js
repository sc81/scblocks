/**
 * External dependencies
 */
import classnames from 'classnames';

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
import { createBlock } from '@wordpress/blocks';
import { useEffect } from '@wordpress/element';

/**
 * Internal dependencies
 */
import './markformat';
import { selectorsSettings } from './utils';
import { useBlockMemo } from '../../hooks/use-block-memo';
import useDynamicCss from '../../hooks/use-dynamic-css';
import ControlsManager from '../../components/controls-manager';
import { CORE_EDIT_POST_STORE_NAME } from '../../constants';
import { name as blockName } from '.';
import { BLOCK_CLASSES, BLOCK_SELECTOR } from '../../block/constants';
import GoogleFontsLink from '../../block/google-fonts-link';
import DangerouslyPasteIcon from '../../components/dangerously-paste-icon';
import {
	useSelectorsActivity,
	setSelectorActivity,
} from '../../hooks/use-selector-activity';
import IconPicker from '../../components/icon-picker';
import {
	removeSelectors,
	getPropsForEveryDevice,
	setPropsForVariousDevices,
} from '../../utils';
import IdClassesControls from '../../block/id-classes-controls.js';

const typographyProps = [
	'fontSize',
	'fontFamily',
	'fontWeight',
	'fontStyle',
	'lineHeight',
	'letterSpacing',
	'textDecoration',
	'textTransform',
];

export default function Edit( props ) {
	const { attributes, setAttributes, onReplace } = props;
	const { text, tagName, uidClass, icon, isWrapped, cssClasses } = attributes;

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
		setSelectorActivity( selectorsActivity, 'wrapper', isWrapped );
		setSelectorActivity( selectorsActivity, 'icon', isWrapped );
		setSelectorActivity( selectorsActivity, 'heading', ! isWrapped );
	}, [ selectorsActivity, isWrapped ] );

	function onRemoveIcon() {
		setAttributes( {
			icon: '',
			isWrapped: false,
		} );
		const properties = getPropsForEveryDevice( {
			attributes,
			selector: BLOCK_SELECTOR.headingWrapped.text.alias,
			props: typographyProps,
		} );
		const attrs = {
			css: {},
		};
		function setAttrs( next ) {
			attrs.css = next.css;
		}
		// rewrite typography props
		setPropsForVariousDevices( {
			attributes,
			setAttributes: setAttrs,
			selector: BLOCK_SELECTOR.blockMainSelectorAlias,
			props: properties,
		} );
		// delete flex props
		setPropsForVariousDevices( {
			attributes: attrs,
			setAttributes: setAttrs,
			selector: BLOCK_SELECTOR.blockMainSelectorAlias,
			everyDeviceProps: {
				flexDirection: '',
				justifyContent: '',
				alignItems: '',
			},
		} );
		// remove unnecessary selectors
		removeSelectors( {
			attributes: attrs,
			setAttributes,
			selectors: [
				BLOCK_SELECTOR.headingWrapped.icon.alias,
				BLOCK_SELECTOR.headingWrapped.text.alias,
			],
		} );
	}
	function onSelectIcon( value ) {
		const properties = getPropsForEveryDevice( {
			attributes,
			selector: BLOCK_SELECTOR.blockMainSelectorAlias,
			props: typographyProps,
		} );
		const attrs = {
			css: {},
		};
		function setAttrs( next ) {
			attrs.css = next.css;
		}
		// rewrite typography props
		setPropsForVariousDevices( {
			attributes,
			setAttributes: setAttrs,
			selector: BLOCK_SELECTOR.headingWrapped.text.alias,
			props: properties,
		} );
		// delete typography props from the main selector
		setPropsForVariousDevices( {
			attributes: attrs,
			setAttributes,
			selector: BLOCK_SELECTOR.blockMainSelectorAlias,
			everyDeviceProps: {
				fontSize: '',
				fontFamily: '',
				fontWeight: '',
				fontStyle: '',
				lineHeight: '',
				letterSpacing: '',
				textDecoration: '',
				textTransform: '',
			},
		} );
		setAttributes( { icon: value, isWrapped: true } );
	}

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
							<IdClassesControls { ...props } />
							<SelectControl
								label={ __( 'Heading level', 'scblocks' ) }
								value={ tagName }
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
									{
										label: __( 'p', 'scblocks' ),
										value: 'p',
									},
								] }
								onChange={ ( value ) =>
									setAttributes( { tagName: value } )
								}
							/>
							<IconPicker
								icon={ icon }
								onSelect={ onSelectIcon }
								onClear={ onRemoveIcon }
							/>
						</PanelBody>
					}
				/>
			</InspectorControls>
			<GoogleFontsLink attributes={ attributes } />
			{ ! isWrapped && (
				<RichText
					tagName={ Block[ tagName ] }
					className={ classnames( {
						[ BLOCK_CLASSES.heading.text ]: true,
						[ uidClass ]: true,
						[ `${ cssClasses }` ]: '' !== cssClasses,
					} ) }
					value={ text }
					onChange={ ( value ) => setAttributes( { text: value } ) }
					placeholder={ __( 'Heading', 'scblocks' ) }
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
			) }
			{ isWrapped && (
				<Block.div
					className={ `${ BLOCK_CLASSES.heading.wrapper } ${ uidClass }` }
				>
					<DangerouslyPasteIcon
						icon={ icon }
						className={ BLOCK_CLASSES.heading.icon }
					/>
					<RichText
						tagName={ tagName }
						className={ classnames( {
							[ BLOCK_CLASSES.heading.text ]: true,
							[ `${ cssClasses }` ]: '' !== cssClasses,
						} ) }
						value={ text }
						onChange={ ( value ) =>
							setAttributes( { text: value } )
						}
						placeholder={ __( 'Heading', 'scblocks' ) }
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
				</Block.div>
			) }
		</>
	);
}
