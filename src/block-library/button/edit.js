/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	RichText,
	useBlockProps,
	BlockControls,
} from '@wordpress/block-editor';
import { applyFilters } from '@wordpress/hooks';

/**
 * ScBlocks dependencies
 */
import {
	BLOCK_CLASSES,
	URLPicker,
	Inspector,
	useRequiredProps,
} from '@scblocks/block';
import { DangerouslyPasteIcon } from '@scblocks/components';

/**
 * Internal dependencies
 */
import getSelectorsSettings from './selectors-settings';
import './inspector-controls';

const allowedFormats = [];
const placeholder = __( 'Button', 'scblocks' );

export default function Edit( props ) {
	const { attributes, setAttributes } = props;
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
		dynamicUrl,
	} = attributes;

	const requiredProps = useRequiredProps( props, getSelectorsSettings );
	const { style, devices, itemClass, uidClass } = requiredProps;

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
				[ BLOCK_CLASSES.button.text ]: ! icon,
				[ uidClass ]: true,
				[ itemClass ]: !! itemClass,
				[ htmlClass ]: !! htmlClass,
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
			<Inspector { ...props } { ...requiredProps } />
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
