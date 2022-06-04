/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import {
	RichText,
	useBlockProps,
	BlockControls,
} from '@wordpress/block-editor';
import { useEffect } from '@wordpress/element';
import { applyFilters } from '@wordpress/hooks';

/**
 * ScBlocks dependencies
 */
import {
	useDynamicCss,
	useBlockMemo,
	BLOCK_CLASSES,
	getUidClass,
	PasteUsedIcon,
	URLPicker,
	useSelectorsSettings,
} from '@scblocks/block';
import { CORE_EDIT_POST_STORE_NAME } from '@scblocks/constants';

/**
 * Internal dependencies
 */
import getSelectorsSettings from './utils';
import Inspector from './inspector';

const SELECTORS_INITIAL_SETTINGS = getSelectorsSettings();

const allowedFormats = [];
const placeholder = __( 'Button', 'scblocks' );

export default function Edit( props ) {
	const { attributes, setAttributes, clientId, name } = props;
	const {
		text,
		iconId,
		url,
		withoutText,
		htmlClass,
		relNoFollow,
		relSponsored,
		target,
		htmlId,
		ariaLabel,
		isDynamic,
		dynamicUrl,
	} = attributes;

	const devices = useSelect(
		( select ) =>
			select( CORE_EDIT_POST_STORE_NAME )
				.__experimentalGetPreviewDeviceType()
				.toLowerCase(),
		[]
	);
	const selectorsSettings = useSelectorsSettings(
		SELECTORS_INITIAL_SETTINGS,
		'button',
		props
	);
	const blockMemo = useBlockMemo( attributes, selectorsSettings );

	const style = useDynamicCss( props, devices );

	useEffect( () => {
		if ( typeof isDynamic === 'undefined' || ! isDynamic ) {
			setAttributes( { isDynamic: true } );
		}
	}, [ isDynamic, setAttributes ] );

	const relAttributes = [];

	if ( relNoFollow ) {
		relAttributes.push( 'nofollow' );
	}

	if ( target ) {
		relAttributes.push( 'noopener', 'noreferrer' );
	}

	if ( relSponsored ) {
		relAttributes.push( 'sponsored' );
	}
	const rel =
		relAttributes.length > 0 ? relAttributes.join( ' ' ) : undefined;

	const htmlAttributes = applyFilters(
		'scblocks.button.htmlAttributes',
		{
			id: !! htmlId ? htmlId : undefined,
			className: classnames( {
				[ BLOCK_CLASSES.button.main ]: true,
				[ getUidClass( name, clientId ) ]: true,
				[ BLOCK_CLASSES.button.text ]: ! iconId,
				[ `${ htmlClass }` ]: '' !== htmlClass,
			} ),
			href: url,
			target: target ? '_blank' : undefined,
			rel,
			'aria-label': !! ariaLabel ? ariaLabel : undefined,
		},
		props
	);
	const blockProps = useBlockProps( htmlAttributes );

	const dynamicContent = applyFilters(
		'scblocks.button.dynamicContent',
		null,
		props
	);

	function onChangeText( value ) {
		setAttributes( { text: value } );
	}

	const Tag = htmlAttributes.href ? 'a' : 'span';
	const isIcon = !! iconId;

	return (
		<>
			{ applyFilters(
				'scblocks.button.blockControls',
				null,
				props,
				devices
			) }
			{ ! dynamicUrl && (
				<BlockControls group="block">
					<URLPicker { ...props } />
				</BlockControls>
			) }
			<Inspector
				{ ...props }
				devices={ devices }
				blockMemo={ blockMemo }
				selectorsSettings={ selectorsSettings }
			/>
			<style>{ style }</style>
			{ /* eslint-disable  jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */ }
			{ isIcon && (
				<Tag { ...blockProps } onClick={ ( e ) => e.preventDefault() }>
					<PasteUsedIcon
						iconId={ iconId }
						className={ BLOCK_CLASSES.button.icon }
					/>
					{ !! dynamicContent && (
						<span className={ BLOCK_CLASSES.button.text }>
							{ dynamicContent }
						</span>
					) }
					{ ! withoutText && ! dynamicContent && (
						<RichText
							tagName="span"
							className={ BLOCK_CLASSES.button.text }
							value={ text }
							onChange={ onChangeText }
							placeholder={ placeholder }
							allowedFormats={ allowedFormats }
						/>
					) }
				</Tag>
			) }
			{ ! isIcon && ! dynamicContent && (
				<RichText
					tagName={ Tag }
					value={ text }
					onChange={ onChangeText }
					placeholder={ placeholder }
					allowedFormats={ allowedFormats }
					{ ...blockProps }
				/>
			) }
			{ ! isIcon && !! dynamicContent && (
				<Tag { ...blockProps }>{ dynamicContent }</Tag>
			) }
		</>
	);
}
