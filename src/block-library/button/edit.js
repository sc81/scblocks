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
import {
	CORE_EDIT_POST_STORE_NAME,
	MOBILE_DEVICES,
	TABLET_DEVICES,
} from '../../constants';
import Inspector from './inspector';
import { useBlockMemo } from '../../hooks/use-block-memo';
import URLPicker from './url-picker';
import {
	setSelectorActivity,
	useSelectorsActivity,
} from '../../hooks/use-selector-activity';
import { BLOCK_CLASSES, BLOCK_SELECTOR } from '../../block/constants';
import { getPropsForEveryDevice } from '../../utils';
import GoogleFontsLink from '../../block/google-fonts-link';
import DangerouslyPasteIcon from '../../components/dangerously-paste-icon';

export default function Edit( props ) {
	const { attributes, setAttributes, isSelected } = props;
	const {
		text,
		icon,
		uidClass,
		url,
		withoutText,
		htmlClass,
		relNoFollow,
		relSponsored,
		target,
		htmlId,
		ariaLabel,
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
	useDynamicCss( props, devices );

	const selectorsActivity = useSelectorsActivity( selectorsSettings );

	useEffect( () => {
		setSelectorActivity(
			selectorsActivity,
			BLOCK_SELECTOR.button.icon.alias,
			!! icon
		);
	}, [ selectorsActivity, icon ] );

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
				[ uidClass ]: true,
				[ BLOCK_CLASSES.button.btn ]: true,
				[ BLOCK_CLASSES.button.text ]: ! icon,
				[ `${ htmlClass }` ]: '' !== htmlClass,
			} ),
			href: url,
			target: target ? '_blank' : undefined,
			rel,
			'aria-label': !! ariaLabel ? ariaLabel : undefined,
		},
		attributes
	);
	const flexGrowForEveryDevice = getPropsForEveryDevice( {
		attributes,
		selector: BLOCK_SELECTOR.button.main.alias,
		props: [ 'flexGrow' ],
	} );
	let flexGrow = flexGrowForEveryDevice.desktop?.flexGrow || '';

	if (
		TABLET_DEVICES === devices &&
		flexGrowForEveryDevice.tablet?.flexGrow
	) {
		flexGrow = flexGrowForEveryDevice.tablet.flexGrow;
	}
	if (
		MOBILE_DEVICES === devices &&
		flexGrowForEveryDevice.mobile?.flexGrow
	) {
		flexGrow = flexGrowForEveryDevice.mobile.flexGrow;
	}
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
			<Block.div style={ { flexGrow } }>
				<GoogleFontsLink attributes={ attributes } />
				{ /* eslint-disable  jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */ }
				<Tag
					{ ...htmlAttributes }
					onClick={ ( e ) => e.preventDefault() }
				>
					<DangerouslyPasteIcon
						icon={ icon }
						className={ BLOCK_CLASSES.button.icon }
					/>
					{ ! withoutText && (
						<RichText
							className={
								!! icon ? BLOCK_CLASSES.button.text : ''
							}
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
				<URLPicker
					attributes={ attributes }
					setAttributes={ setAttributes }
					isSelected={ isSelected }
				/>
			</Block.div>
		</>
	);
}
