/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { RichText, useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { createBlock } from '@wordpress/blocks';
import { useEffect } from '@wordpress/element';
import { applyFilters } from '@wordpress/hooks';

/**
 * ScBlocks dependencies
 */
import {
	BLOCK_CLASSES,
	GoogleFontsLink,
	Inspector,
	useRequiredProps,
} from '@scblocks/block';
import { DangerouslyPasteIcon } from '@scblocks/components';

/**
 * Internal dependencies
 */
import './markformat';
import getSelectorsSettings from './selectors-settings';
import './inspector-controls';
import './block-controls';
import { HEADING_BLOCK_NAME } from './utils';

const placeholder = __( 'Heading', 'scblocks' );

export default function Edit( props ) {
	const { attributes, setAttributes, onReplace, clientId } = props;
	const { text, tagName, icon, htmlClass, htmlId, isDynamic } = attributes;

	const requiredProps = useRequiredProps( props, getSelectorsSettings );
	const { style, devices, itemClass, uidClass } = requiredProps;

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
					[ BLOCK_CLASSES.heading.text ]: ! icon,
					[ uidClass ]: true,
					[ itemClass ]: !! itemClass,
					[ htmlClass ]: !! htmlClass,
				} ),
			},
			attributes
		)
	);

	const dynamicContent = applyFilters(
		'scblocks.heading.dynamicContent',
		null,
		props
	);

	function onSplit( value ) {
		if ( ! value ) {
			return createBlock( 'core/paragraph' );
		}

		return createBlock( HEADING_BLOCK_NAME, {
			...attributes,
			text: value,
		} );
	}

	function onChangeText( value ) {
		setAttributes( { text: value } );
	}

	const isIcon = !! icon;
	const Tag = tagName;

	return (
		<>
			{ applyFilters(
				'scblocks.heading.blockControls',
				null,
				props,
				devices
			) }
			<style>{ style }</style>
			<Inspector { ...props } { ...requiredProps } />
			<GoogleFontsLink clientId={ clientId } />
			{ isIcon && (
				<Tag { ...blockProps }>
					<DangerouslyPasteIcon
						icon={ icon }
						className={ BLOCK_CLASSES.heading.icon }
					/>
					{ !! dynamicContent && (
						<span className={ BLOCK_CLASSES.heading.text }>
							{ dynamicContent }
						</span>
					) }
					{ ! dynamicContent && (
						<RichText
							tagName="span"
							className={ BLOCK_CLASSES.heading.text }
							value={ text }
							onChange={ onChangeText }
							placeholder={ placeholder }
							onSplit={ onSplit }
							onReplace={ onReplace }
						/>
					) }
				</Tag>
			) }
			{ ! isIcon && ! dynamicContent && (
				<RichText
					tagName={ tagName }
					value={ text }
					onChange={ onChangeText }
					placeholder={ placeholder }
					onSplit={ onSplit }
					onReplace={ onReplace }
					{ ...blockProps }
				/>
			) }
			{ ! isIcon && !! dynamicContent && (
				<Tag { ...blockProps }>{ dynamicContent }</Tag>
			) }
		</>
	);
}
