/**
 * WordPress dependencies
 */
import {
	InnerBlocks,
	__experimentalBlock as Block,
} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { selectors, GROUP_CLASS, GROUP_INNER_CLASS } from './utils';
import {
	CORE_BLOCK_EDITOR_STORE_NAME,
	CORE_EDIT_POST_STORE_NAME,
} from '../../constants';
import BackgroundVideo from './background-video';
import BackgroundOverlay from '../../block/background-overlay';
import { useBlockMemo } from '../../hooks/use-block-memo';
import useDynamicCss from '../../hooks/use-dynamic-css';
import Inspector from './inspector';

export default function Edit( props ) {
	const { attributes, clientId } = props;
	const { uidClass, tag } = attributes;
	const { devices, hasInnerBlocks } = useSelect(
		( select ) => {
			const block = select( CORE_BLOCK_EDITOR_STORE_NAME ).getBlock(
				clientId
			);
			return {
				hasInnerBlocks: !! ( block && block.innerBlocks.length ),
				devices: select(
					CORE_EDIT_POST_STORE_NAME
				).__experimentalGetPreviewDeviceType(),
			};
		},
		[ clientId ]
	);

	useDynamicCss( props, devices );

	const blockMemo = useBlockMemo( attributes, selectors );

	const BlockWrapper = Block[ tag ];

	return (
		<>
			<Inspector
				{ ...props }
				devices={ devices }
				blockMemo={ blockMemo }
			/>
			<BlockWrapper className={ `${ GROUP_CLASS } ${ uidClass }` }>
				<BackgroundVideo attributes={ attributes } />
				<BackgroundOverlay attributes={ attributes } isEditMode />
				<InnerBlocks
					templateLock={ false }
					renderAppender={
						! hasInnerBlocks && InnerBlocks.ButtonBlockAppender
					}
					__experimentalTagName="div"
					__experimentalPassedProps={ {
						className: GROUP_INNER_CLASS,
					} }
				/>
			</BlockWrapper>
		</>
	);
}
