/**
 * Internal dependencies
 */
import { BG_OVERLAY_CLASS } from '../../constants';

export default function BackgroundOverlay( {
	attributes: { isBackgroundOverlay },
	isEditMode,
} ) {
	const element = <div className={ BG_OVERLAY_CLASS }></div>;

	if ( isEditMode ) {
		return element;
	}
	if ( isBackgroundOverlay ) {
		return element;
	}
	return null;
}
