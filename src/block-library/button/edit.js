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
/**
 * Internal dependencies
 */
import {
	BUTTON_CLASS,
	BUTTON_LINK_CLASS,
	BUTTON_TEXT_CLASS,
	BUTTON_ICON_CLASS,
	selectors,
	BUTTON_ICON_SELECTOR,
} from './utils';
import useDynamicCss from '../../hooks/use-dynamic-css';
import { CORE_EDIT_POST_STORE_NAME } from '../../constants';
import Inspector from './inspector';
import { useBlockMemo } from '../../hooks/use-block-memo';
import URLPicker from './url-picker';
import {
	setSelectorActivity,
	useSelectorsActivity,
} from '../../hooks/use-selector-activity';

const NEW_TAB_REL = 'noreferrer noopener';

export default function Edit( props ) {
	const { attributes, setAttributes, isSelected } = props;
	const { url, linkTarget, rel, text, icon, uidClass } = attributes;

	const devices = useSelect(
		( select ) =>
			select(
				CORE_EDIT_POST_STORE_NAME
			).__experimentalGetPreviewDeviceType(),
		[]
	);
	const blockMemo = useBlockMemo( attributes, selectors );
	useDynamicCss( props, devices );

	const selectorsActivity = useSelectorsActivity( selectors );

	useEffect( () => {
		setSelectorActivity( selectorsActivity, BUTTON_ICON_SELECTOR, !! icon );
	}, [ selectorsActivity, icon ] );

	function onToggleOpenInNewTab( value ) {
		const newLinkTarget = value ? '_blank' : undefined;

		let updatedRel = rel;
		if ( newLinkTarget && ! rel ) {
			updatedRel = NEW_TAB_REL;
		} else if ( ! newLinkTarget && rel === NEW_TAB_REL ) {
			updatedRel = undefined;
		}

		setAttributes( {
			linkTarget: newLinkTarget,
			rel: updatedRel,
		} );
	}

	return (
		<>
			<Inspector
				{ ...props }
				devices={ devices }
				blockMemo={ blockMemo }
				onToggleOpenInNewTab={ onToggleOpenInNewTab }
				selectorsActivity={ selectorsActivity }
			/>
			<Block.div className={ `${ BUTTON_CLASS } ${ uidClass }` }>
				<div className={ BUTTON_LINK_CLASS }>
					{ icon && (
						<span
							className={ BUTTON_ICON_CLASS }
							dangerouslySetInnerHTML={ { __html: icon } }
						/>
					) }
					<RichText
						tagName="span"
						className={ BUTTON_TEXT_CLASS }
						value={ text }
						onChange={ ( value ) =>
							setAttributes( { text: value } )
						}
						placeholder={ __( 'Add text…' ) }
						withoutInteractiveFormatting
					/>
				</div>
				<URLPicker
					url={ url }
					setAttributes={ setAttributes }
					isSelected={ isSelected }
					opensInNewTab={ linkTarget === '_blank' }
					onToggleOpenInNewTab={ onToggleOpenInNewTab }
				/>
			</Block.div>
		</>
	);
}
