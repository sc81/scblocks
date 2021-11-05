import getUidForIcon from './get-uid-for-icon';

export default function getIconAttrs( iconName, iconAsString, usedIcons ) {
	let id;

	for ( const uid in usedIcons ) {
		if ( usedIcons[ uid ] === iconAsString ) {
			id = uid;
		}
	}
	const iconAttrs = {};
	let newIconId;
	if ( id ) {
		iconAttrs.iconId = id;
		iconAttrs.iconName = '';
		iconAttrs.iconHtml = '';
	} else {
		newIconId = getUidForIcon( usedIcons );
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
