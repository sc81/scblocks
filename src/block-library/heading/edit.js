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
	BLOCK_SELECTOR,
	GoogleFontsLink,
	useSelectorsActivity,
	setSelectorActivity,
	getUidClass,
	PasteUsedIcon,
} from '@scblocks/block';
import { CORE_EDIT_POST_STORE_NAME } from '@scblocks/constants';

/**
 * Internal dependencies
 */
import './markformat';
import { HEADING_SELECTORS_SETTINGS } from './utils';
import { name as blockName } from '.';
import Inspector from './inspector';

export default function Edit( props ) {
	const { attributes, setAttributes, onReplace, clientId, name } = props;
	const {
		text,
		tagName: Tag,
		iconName,
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
	const selectorsSettings = applyFilters(
		'scblocks.heading.selectorsSettings',
		HEADING_SELECTORS_SETTINGS,
		BLOCK_SELECTOR
	);
	const blockMemo = useBlockMemo( attributes, selectorsSettings );
	const style = useDynamicCss( props, devices );

	const selectorsActivity = useSelectorsActivity( selectorsSettings );

	useEffect( () => {
		setSelectorActivity( selectorsActivity, 'icon', iconName );
	}, [ selectorsActivity, iconName ] );

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
					[ BLOCK_CLASSES.heading.text ]: ! iconName,
					[ `${ htmlClass }` ]: '' !== htmlClass,
				} ),
			},
			attributes
		)
	);

	return (
		<>
			<style>{ style }</style>
			<Inspector
				{ ...props }
				devices={ devices }
				blockMemo={ blockMemo }
				selectorsSettings={ selectorsSettings }
				selectorsActivity={ selectorsActivity }
			/>
			<GoogleFontsLink attributes={ attributes } />
			<Tag { ...blockProps }>
				<PasteUsedIcon
					iconName={ iconName }
					className={ BLOCK_CLASSES.heading.icon }
				/>
				<RichText
					tagName="span"
					className={
						!! iconName ? BLOCK_CLASSES.heading.text : null
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
