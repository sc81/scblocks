/**
 * Internal dependencies
 */
import { ALL_DEVICES } from '../../constants';
import {
	GROUP_BG_VIDEO_WRAP_CLASS,
	GROUP_BG_VIDEO_CLASS,
	GROUP_SELECTOR,
} from './utils';

export default function BackgroundVideo( { attributes } ) {
	const { css } = attributes;

	function isBgVideo() {
		return (
			css[ ALL_DEVICES ] &&
			css[ ALL_DEVICES ][ GROUP_SELECTOR ] &&
			css[ ALL_DEVICES ][ GROUP_SELECTOR ].settings &&
			css[ ALL_DEVICES ][ GROUP_SELECTOR ].settings.bgVideo
		);
	}
	if ( ! isBgVideo() ) {
		return null;
	}
	const { url, loop } = css[ ALL_DEVICES ][ GROUP_SELECTOR ].settings.bgVideo;

	return (
		<div className={ GROUP_BG_VIDEO_WRAP_CLASS }>
			<video
				className={ GROUP_BG_VIDEO_CLASS }
				autoPlay
				muted
				loop={ !! loop }
				src={ url }
			/>
		</div>
	);
}
