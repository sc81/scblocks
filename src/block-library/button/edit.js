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
	__experimentalBlock as Block,
} from '@wordpress/block-editor';
import { useEffect } from '@wordpress/element';
import { applyFilters } from '@wordpress/hooks';

/**
 * Internal dependencies
 */
import { BUTTON_SELECTORS_SETTINGS } from './utils';
import useDynamicCss from '../../hooks/use-dynamic-css';
import { CORE_EDIT_POST_STORE_NAME } from '../../constants';
import Inspector from './inspector';
import { useBlockMemo } from '../../hooks/use-block-memo';
import URLPicker from './url-picker';
import {
	setSelectorActivity,
	useSelectorsActivity,
} from '../../hooks/use-selector-activity';
import { BLOCK_CLASSES, BLOCK_SELECTOR } from '../../block/constants';
import { getPropValue } from '../../utils';
import GoogleFontsLink from '../../block/google-fonts-link';

export default function Edit( props ) {
	const { attributes, setAttributes, isSelected } = props;
	const {
		text,
		icon,
		uidClass,
		url,
		withoutText,
		cssClasses,
		relNoFollow,
		relSponsored,
		target,
		elementId,
		ariaLabel,
	} = attributes;

	const devices = useSelect(
		( select ) =>
			select(
				CORE_EDIT_POST_STORE_NAME
			).__experimentalGetPreviewDeviceType(),
		[]
	);
	const selectorsSettings = applyFilters(
		'scblocks.button.selectorsSettings',
		BUTTON_SELECTORS_SETTINGS,
		BLOCK_SELECTOR
	);
	const blockMemo = useBlockMemo( attributes, selectorsSettings );
	useDynamicCss( props, devices );

	const selectorsActivity = useSelectorsActivity( selectorsSettings );

	useEffect( () => {
		setSelectorActivity(
			selectorsActivity,
			BLOCK_SELECTOR.button.icon.alias,
			!! icon
		);
	}, [ selectorsActivity, icon ] );

	const flexGrow = getPropValue( {
		attributes,
		devices,
		selector: BLOCK_SELECTOR.blockMainSelectorAlias,
		propName: 'flexGrow',
	} );
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
			id: !! elementId ? elementId : undefined,
			className: classnames( {
				[ BLOCK_CLASSES.button.main ]: true,
				[ uidClass ]: true,
				[ `${ cssClasses }` ]: '' !== cssClasses,
			} ),
			href: url,
			target: target ? '_blank' : undefined,
			rel,
			'aria-label': !! ariaLabel ? ariaLabel : undefined,
		},
		attributes
	);

	return (
		<>
			<Inspector
				{ ...props }
				devices={ devices }
				blockMemo={ blockMemo }
				selectorsSettings={ selectorsSettings }
				selectorsActivity={ selectorsActivity }
			/>
			<Block.div style={ { flexGrow } }>
				<GoogleFontsLink attributes={ attributes } />
				{ /* eslint-disable  jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */ }
				<a
					{ ...htmlAttributes }
					onClick={ ( e ) => e.preventDefault() }
				>
					{ icon && (
						<span
							className={ BLOCK_CLASSES.button.icon }
							dangerouslySetInnerHTML={ { __html: icon } }
						/>
					) }
					{ ! withoutText && (
						<RichText
							tagName="span"
							className={ BLOCK_CLASSES.button.text }
							value={ text }
							onChange={ ( value ) =>
								setAttributes( { text: value } )
							}
							placeholder={ __( 'Button', 'scblocks' ) }
							withoutInteractiveFormatting
						/>
					) }
				</a>
				<URLPicker
					attributes={ attributes }
					setAttributes={ setAttributes }
					isSelected={ isSelected }
				/>
			</Block.div>
		</>
	);
}
