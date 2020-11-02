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
	const {
		text,
		tagName,
		uidClass,
		icon,
		isWrapped,
		cssClasses,
		elementId,
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
	useDynamicCss( props, devices );

	const selectorsActivity = useSelectorsActivity( selectorsSettings );

	useEffect( () => {
		setSelectorActivity( selectorsActivity, 'wrapper', isWrapped );
		setSelectorActivity( selectorsActivity, 'icon', isWrapped );
		setSelectorActivity( selectorsActivity, 'heading', ! isWrapped );
	}, [ selectorsActivity, isWrapped ] );

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
			{ ! isWrapped && (
				<RichText
					tagName={ Block[ tagName ] }
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
					{ ...applyFilters(
						'scblocks.heading.htmlAttributes',
						{
							id: !! elementId ? elementId : undefined,
							className: classnames( {
								[ BLOCK_CLASSES.heading.text ]: true,
								[ uidClass ]: true,
								[ `${ cssClasses }` ]: '' !== cssClasses,
							} ),
						},
						attributes
					) }
				/>
			) }
			{ isWrapped && (
				<Block.div
					className={ `${ BLOCK_CLASSES.heading.wrapper } ${ uidClass }` }
				>
					<DangerouslyPasteIcon
						icon={ icon }
						className={ BLOCK_CLASSES.heading.icon }
					/>
					<RichText
						tagName={ tagName }
						value={ text }
						onChange={ ( value ) =>
							setAttributes( { text: value } )
						}
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
						{ ...applyFilters(
							'scblocks.heading.htmlAttributes',
							{
								id: !! elementId ? elementId : undefined,
								className: classnames( {
									[ BLOCK_CLASSES.heading.text ]: true,
									[ `${ cssClasses }` ]: '' !== cssClasses,
								} ),
							},
							attributes
						) }
					/>
				</Block.div>
			) }
		</>
	);
}
