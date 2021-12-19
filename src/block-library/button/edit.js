/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { RichText, useBlockProps } from '@wordpress/block-editor';
import { useEffect } from '@wordpress/element';
import { applyFilters } from '@wordpress/hooks';

/**
 * ScBlocks dependencies
 */
import {
	useDynamicCss,
	useBlockMemo,
	useSelectorsActivity,
	setSelectorActivity,
	GoogleFontsLink,
	BLOCK_CLASSES,
	BLOCK_SELECTOR,
	getUidClass,
	PasteUsedIcon,
	URLPicker,
} from '@scblocks/block';
import { CORE_EDIT_POST_STORE_NAME } from '@scblocks/constants';

/**
 * Internal dependencies
 */
import { BUTTON_SELECTORS_SETTINGS } from './utils';
import Inspector from './inspector';

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
	} = attributes;

	const devices = useSelect(
		( select ) =>
			select( CORE_EDIT_POST_STORE_NAME )
				.__experimentalGetPreviewDeviceType()
				.toLowerCase(),
		[]
	);
	const selectorsSettings = applyFilters(
		'scblocks.button.selectorsSettings',
		BUTTON_SELECTORS_SETTINGS,
		BLOCK_SELECTOR
	);
	const blockMemo = useBlockMemo( attributes, selectorsSettings );
	const style = useDynamicCss( props, devices );

	const selectorsActivity = useSelectorsActivity( selectorsSettings );

	useEffect( () => {
		setSelectorActivity(
			selectorsActivity,
			BLOCK_SELECTOR.button.icon.alias,
			!! iconId
		);
	}, [ selectorsActivity, iconId ] );
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

	const blockProps = useBlockProps(
		applyFilters(
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
			attributes
		)
	);
	const Tag = url ? 'a' : 'span';

	return (
		<>
			<Inspector
				{ ...props }
				devices={ devices }
				blockMemo={ blockMemo }
				selectorsSettings={ selectorsSettings }
				selectorsActivity={ selectorsActivity }
			/>
			<style>{ style }</style>
			<GoogleFontsLink attributes={ attributes } />
			{ /* eslint-disable  jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */ }
			<Tag { ...blockProps } onClick={ ( e ) => e.preventDefault() }>
				<PasteUsedIcon
					iconId={ iconId }
					className={ BLOCK_CLASSES.button.icon }
				/>
				{ ! withoutText && (
					<RichText
						className={ !! iconId ? BLOCK_CLASSES.button.text : '' }
						value={ text }
						onChange={ ( value ) =>
							setAttributes( { text: value } )
						}
						placeholder={ __( 'Button', 'scblocks' ) }
						allowedFormats={ [
							'core/bold',
							'core/italic',
							'core/strikethrough',
						] }
						keepPlaceholderOnFocus
					/>
				) }
			</Tag>
			<URLPicker { ...props } />
		</>
	);
}
