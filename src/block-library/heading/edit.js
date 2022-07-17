/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { RichText, useBlockProps } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { createBlock } from '@wordpress/blocks';
import { useEffect } from '@wordpress/element';
import { applyFilters } from '@wordpress/hooks';

/**
 * ScBlocks dependencies
 */
import {
	useDynamicCss,
	useBlockMemo,
	BLOCK_CLASSES,
	GoogleFontsLink,
	getUidClass,
	PasteUsedIcon,
	useSelectorsSettings,
} from '@scblocks/block';
import { CORE_EDIT_POST_STORE_NAME } from '@scblocks/constants';

/**
 * Internal dependencies
 */
import './markformat';
import getSelectorsSettings from './selectors-settings';
import Inspector from './inspector';
import './block-controls';
import { HEADING_BLOCK_NAME } from './utils';

const placeholder = __( 'Heading', 'scblocks' );

export default function Edit( props ) {
	const { attributes, setAttributes, onReplace, clientId, name } = props;
	const { text, tagName, iconId, htmlClass, htmlId, isDynamic } = attributes;

	const devices = useSelect(
		( select ) =>
			select( CORE_EDIT_POST_STORE_NAME )
				.__experimentalGetPreviewDeviceType()
				.toLowerCase(),
		[]
	);
	const [ selectorsSettings, setSelectorsSettings ] = useSelectorsSettings(
		getSelectorsSettings,
		'heading',
		props
	);
	const blockMemo = useBlockMemo( attributes, selectorsSettings );
	const style = useDynamicCss( props, devices );

	useEffect( () => {
		if ( typeof isDynamic === 'undefined' || ! isDynamic ) {
			setAttributes( { isDynamic: true } );
		}
	}, [ isDynamic, setAttributes ] );

	const blockProps = useBlockProps(
		applyFilters(
			'scblocks.heading.htmlAttributes',
			{
				id: !! htmlId ? htmlId : undefined,
				className: classnames( {
					[ BLOCK_CLASSES.heading.main ]: true,
					[ getUidClass( name, clientId ) ]: true,
					[ BLOCK_CLASSES.heading.text ]: ! iconId,
					[ `${ htmlClass }` ]: '' !== htmlClass,
				} ),
			},
			attributes
		)
	);

	const dynamicContent = applyFilters(
		'scblocks.heading.dynamicContent',
		null,
		props
	);

	function onSplit( value ) {
		if ( ! value ) {
			return createBlock( 'core/paragraph' );
		}

		return createBlock( HEADING_BLOCK_NAME, {
			...attributes,
			text: value,
		} );
	}

	function onChangeText( value ) {
		setAttributes( { text: value } );
	}

	const isIcon = !! iconId;
	const Tag = tagName;

	return (
		<>
			{ applyFilters(
				'scblocks.heading.blockControls',
				null,
				props,
				devices
			) }
			<style>{ style }</style>
			<Inspector
				{ ...props }
				devices={ devices }
				blockMemo={ blockMemo }
				selectorsSettings={ selectorsSettings }
				setSelectorsSettings={ setSelectorsSettings }
			/>
			<GoogleFontsLink clientId={ clientId } />
			{ isIcon && (
				<Tag { ...blockProps }>
					<PasteUsedIcon
						iconId={ iconId }
						className={ BLOCK_CLASSES.heading.icon }
					/>
					{ !! dynamicContent && (
						<span className={ BLOCK_CLASSES.heading.text }>
							{ dynamicContent }
						</span>
					) }
					{ ! dynamicContent && (
						<RichText
							tagName="span"
							className={ BLOCK_CLASSES.heading.text }
							value={ text }
							onChange={ onChangeText }
							placeholder={ placeholder }
							onSplit={ onSplit }
							onReplace={ onReplace }
						/>
					) }
				</Tag>
			) }
			{ ! isIcon && ! dynamicContent && (
				<RichText
					tagName={ tagName }
					value={ text }
					onChange={ onChangeText }
					placeholder={ placeholder }
					onSplit={ onSplit }
					onReplace={ onReplace }
					{ ...blockProps }
				/>
			) }
			{ ! isIcon && !! dynamicContent && (
				<Tag { ...blockProps }>{ dynamicContent }</Tag>
			) }
		</>
	);
}
