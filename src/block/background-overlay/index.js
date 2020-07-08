import { PLUGIN_NAME, ALL_DEVICES } from '../../constants';

const BACKGROUND_OVERLAY_CLASS = `${ PLUGIN_NAME }-bg-overlay`;

export default function BackgroundOverlay( { attributes, isEditMode } ) {
	const element = <div className={ BACKGROUND_OVERLAY_CLASS }></div>;

	if ( isEditMode ) {
		return element;
	}
	if (
		attributes.css[ ALL_DEVICES ] &&
		attributes.css[ ALL_DEVICES ][ `.${ BACKGROUND_OVERLAY_CLASS }` ]
	) {
		return element;
	}
	return null;
}
