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
		tagName: Tag,
		uidClass,
		icon,
		htmlId,
		htmlClass,
	} = attributes;

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
		<Tag { ...htmlAttributes }>
			<DangerouslyPasteIcon
				icon={ icon }
				className={ BLOCK_CLASSES.heading.icon }
			/>
			<RichText.Content
				value={ text }
				tagName={ !! icon ? 'span' : null }
				className={ !! icon ? BLOCK_CLASSES.heading.text : null }
			/>
		</Tag>
	);
}
