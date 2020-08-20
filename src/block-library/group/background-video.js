/**
 * Internal dependencies
 */
import { ALL_DEVICES } from '../../constants';
import { BLOCK_CLASSES, SELECTORS } from '../../block/constants';

const GROUP_SELECTOR = SELECTORS.blockMainSelectorAlias;

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
		<div className={ BLOCK_CLASSES.group.videoWrapper }>
			<video
				className={ BLOCK_CLASSES.group.video }
				autoPlay
				muted
				loop={ !! loop }
				src={ url }
			/>
		</div>
	);
}
