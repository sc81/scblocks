/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import {
	RichText,
	__experimentalBlock as Block,
} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { createBlock } from '@wordpress/blocks';
import { useEffect } from '@wordpress/element';
import { applyFilters } from '@wordpress/hooks';

/**
 * Internal dependencies
 */
import './markformat';
import { HEADING_SELECTORS_SETTINGS } from './utils';
import { useBlockMemo } from '../../hooks/use-block-memo';
import useDynamicCss from '../../hooks/use-dynamic-css';
import { CORE_EDIT_POST_STORE_NAME } from '../../constants';
import { name as blockName } from '.';
import { BLOCK_CLASSES, BLOCK_SELECTOR } from '../../block/constants';
import GoogleFontsLink from '../../block/google-fonts-link';
import DangerouslyPasteIcon from '../../components/dangerously-paste-icon';
import {
	useSelectorsActivity,
	setSelectorActivity,
} from '../../hooks/use-selector-activity';
import Inspector from './inspector';

export default function Edit( props ) {
	const { attributes, setAttributes, onReplace } = props;
	const { text, tagName, uidClass, icon, htmlClass, htmlId } = attributes;

	const devices = useSelect(
		( select ) =>
			select( CORE_EDIT_POST_STORE_NAME )
				.__experimentalGetPreviewDeviceType()
				.toLowerCase(),
		[]
	);
	const selectorsSettings = applyFilters(
		'scblocks.heading.selectorsSettings',
		HEADING_SELECTORS_SETTINGS,
		BLOCK_SELECTOR
	);
	const blockMemo = useBlockMemo( attributes, selectorsSettings );
	useDynamicCss( props, devices );

	const selectorsActivity = useSelectorsActivity( selectorsSettings );

	useEffect( () => {
		setSelectorActivity( selectorsActivity, 'icon', icon );
	}, [ selectorsActivity, icon ] );

	const Tag = Block[ tagName ];
	const htmlAttributes = applyFilters(
		'scblocks.heading.htmlAttributes',
		{
			id: !! htmlId ? htmlId : undefined,
			className: classnames( {
				[ BLOCK_CLASSES.heading.main ]: true,
				[ uidClass ]: true,
				[ BLOCK_CLASSES.heading.text ]: ! icon,
				[ `${ htmlClass }` ]: '' !== htmlClass,
			} ),
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
			<GoogleFontsLink attributes={ attributes } />
			<Tag { ...htmlAttributes }>
				<DangerouslyPasteIcon
					icon={ icon }
					className={ BLOCK_CLASSES.heading.icon }
				/>
				<RichText
					tagName="span"
					className={ !! icon ? BLOCK_CLASSES.heading.text : null }
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
			</Tag>
		</>
	);
}
