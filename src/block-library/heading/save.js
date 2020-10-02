/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { RichText } from '@wordpress/block-editor';
import { applyFilters } from '@wordpress/hooks';

/**
 * Internal dependencies
 */
import { BLOCK_CLASSES } from '../../block/constants';
import DangerouslyPasteIcon from '../../components/dangerously-paste-icon';

export default function save( { attributes } ) {
	const {
		text,
		tagName,
		uidClass,
		icon,
		isWrapped,
		elementId,
		cssClasses,
	} = attributes;
	if ( ! isWrapped ) {
		const htmlAttributes = applyFilters(
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
		);
		return (
			<RichText.Content
				tagName={ tagName }
				value={ text }
				{ ...htmlAttributes }
			/>
		);
	}
	const htmlAttributes = applyFilters(
		'scblocks.heading.htmlAttributes',
		{
			id: !! elementId ? elementId : undefined,
			className: classnames( {
				[ BLOCK_CLASSES.heading.text ]: true,
				[ `${ cssClasses }` ]: '' !== cssClasses,
			} ),
		},
		attributes
	);
	return (
		<div className={ `${ BLOCK_CLASSES.heading.wrapper } ${ uidClass }` }>
			<DangerouslyPasteIcon
				icon={ icon }
				className={ BLOCK_CLASSES.heading.icon }
			/>
			<RichText.Content
				tagName={ tagName }
				value={ text }
				{ ...htmlAttributes }
			/>
		</div>
	);
}
