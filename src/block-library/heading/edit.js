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
	AlignmentToolbar,
	useSelectorsSettings,
} from '@scblocks/block';
import { CORE_EDIT_POST_STORE_NAME } from '@scblocks/constants';

/**
 * Internal dependencies
 */
import './markformat';
import getSelectorsSettings from './utils';
import { name as blockName } from '.';
import Inspector from './inspector';

const SELECTORS_INITIAL_SETTINGS = getSelectorsSettings();

export default function Edit( props ) {
	const { attributes, setAttributes, onReplace, clientId, name } = props;
	const {
		text,
		tagName: Tag,
		iconId,
		iconPostId,
		htmlClass,
		htmlId,
		isDynamic,
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
					[ BLOCK_CLASSES.heading.text ]: ! iconId && ! iconPostId,
					[ `${ htmlClass }` ]: '' !== htmlClass,
				} ),
			},
			attributes
		)
	);

	return (
		<>
			<AlignmentToolbar
				{ ...props }
				devices={ devices }
				selector="main"
			/>
			<style>{ style }</style>
			<Inspector
				{ ...props }
				devices={ devices }
				blockMemo={ blockMemo }
				selectorsSettings={ selectorsSettings }
			/>
			<GoogleFontsLink clientId={ clientId } />
			<Tag { ...blockProps }>
				<PasteUsedIcon
					iconId={ iconId }
					iconPostId={ iconPostId }
					className={ BLOCK_CLASSES.heading.icon }
				/>
				<RichText
					tagName="span"
					className={
						iconId || iconPostId ? BLOCK_CLASSES.heading.text : null
					}
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
