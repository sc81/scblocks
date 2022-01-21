/**
 * WordPress dependencies
 */
import { select } from '@wordpress/data';

/**
 * ScBlocks dependencies
 */
import { STORE_NAME } from '@scblocks/constants';

/**
 * Internal dependencies
 */
import getUidForIcon from './get-uid-for-icon';

export default function getIconAttrs( iconName, iconAsString ) {
	let nextIconId, postId;

	const icons = select( STORE_NAME ).icons();
	const postedIcons = select( STORE_NAME ).postedIcons();

	for ( const id in postedIcons ) {
		if ( postedIcons[ id ] === iconAsString ) {
			postId = id;
		}
	}

	for ( const uid in icons ) {
		if ( icons[ uid ] === iconAsString ) {
			nextIconId = uid;
		}
	}
	const iconAttrs = {
		iconName: '',
		iconHtml: '',
		iconId: '',
		iconPostId: '',
	};

	if ( nextIconId ) {
		iconAttrs.iconId = nextIconId;
	} else if ( postId ) {
		iconAttrs.iconPostId = postId;
	} else {
		const newIconId = getUidForIcon( icons );
		iconAttrs.iconId = newIconId;
		if ( iconName === 'user-icon' ) {
			iconAttrs.iconName = 'user|free-version|' + newIconId;
		} else {
			iconAttrs.iconName = iconName;
		}
		iconAttrs.iconHtml = iconAsString;
	}
	return iconAttrs;
}
