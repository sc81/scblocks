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
	URLPicker,
	useSelectorsSettings,
	useItemClass,
	Inspector,
} from '@scblocks/block';
import { CORE_EDIT_POST_STORE_NAME } from '@scblocks/constants';
import { DangerouslyPasteIcon } from '@scblocks/components';

/**
 * Internal dependencies
 */
import getSelectorsSettings from './selectors-settings';
import './inspector-controls';

const allowedFormats = [];
const placeholder = __( 'Button', 'scblocks' );

export default function Edit( props ) {
	const { attributes, setAttributes, clientId, name } = props;
	const {
		text,
		icon,
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
	const [ selectorsSettings, setSelectorsSettings ] = useSelectorsSettings(
		getSelectorsSettings,
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

	const itemClass = useItemClass( clientId );

	const htmlAttributes = applyFilters(
		'scblocks.button.htmlAttributes',
		{
			id: !! htmlId ? htmlId : undefined,
			className: classnames( {
				[ BLOCK_CLASSES.button.main ]: true,
				[ getUidClass( name, clientId ) ]: true,
				[ itemClass ]: '' !== itemClass,
				[ BLOCK_CLASSES.button.text ]: ! icon,
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
	const isIcon = !! icon;

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
				setSelectorsSettings={ setSelectorsSettings }
			/>
			<style>{ style }</style>
			{ /* eslint-disable  jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */ }
			{ isIcon && (
				<Tag { ...blockProps } onClick={ ( e ) => e.preventDefault() }>
					<DangerouslyPasteIcon
						icon={ icon }
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
