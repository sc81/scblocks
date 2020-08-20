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
import { selectorsSettings } from './utils';
import useDynamicCss from '../../hooks/use-dynamic-css';
import { CORE_EDIT_POST_STORE_NAME } from '../../constants';
import Inspector from './inspector';
import { useBlockMemo } from '../../hooks/use-block-memo';
import URLPicker from './url-picker';
import {
	setSelectorActivity,
	useSelectorsActivity,
} from '../../hooks/use-selector-activity';
import { BLOCK_CLASSES, SELECTORS } from '../../block/constants';

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
	const blockMemo = useBlockMemo( attributes, selectorsSettings );
	useDynamicCss( props, devices );

	const selectorsActivity = useSelectorsActivity( selectorsSettings );

	useEffect( () => {
		setSelectorActivity(
			selectorsActivity,
			SELECTORS.button.icon.alias,
			!! icon
		);
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
			<Block.div
				className={ `${ BLOCK_CLASSES.button.main } ${ uidClass }` }
			>
				<div className={ BLOCK_CLASSES.button.link }>
					{ icon && (
						<span
							className={ BLOCK_CLASSES.button.icon }
							dangerouslySetInnerHTML={ { __html: icon } }
						/>
					) }
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
