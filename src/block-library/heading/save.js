/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { RichText } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { BLOCK_CLASSES } from '../../block/constants';
import DangerouslyPasteIcon from '../../components/dangerously-paste-icon';

export default function save( {
	attributes: {
		text,
		tagName,
		uidClass,
		icon,
		isWrapped,
		elementId,
		cssClasses,
	},
} ) {
	if ( ! isWrapped ) {
		const classes = classnames( {
			[ BLOCK_CLASSES.heading.text ]: true,
			[ uidClass ]: true,
			[ `${ cssClasses }` ]: '' !== cssClasses,
		} );
		return (
			<RichText.Content
				id={ !! elementId ? elementId : undefined }
				className={ classes }
				tagName={ tagName }
				value={ text }
			/>
		);
	}

	return (
		<div className={ `${ BLOCK_CLASSES.heading.wrapper } ${ uidClass }` }>
			<DangerouslyPasteIcon
				icon={ icon }
				className={ BLOCK_CLASSES.heading.icon }
			/>
			<RichText.Content
				id={ !! elementId ? elementId : undefined }
				className={ classnames( {
					[ BLOCK_CLASSES.heading.text ]: true,
					[ `${ cssClasses }` ]: '' !== cssClasses,
				} ) }
				tagName={ tagName }
				value={ text }
			/>
		</div>
	);
}
