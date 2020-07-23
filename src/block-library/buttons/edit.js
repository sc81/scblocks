/**
 * WordPress dependencies
 */
import { useSelect } from '@wordpress/data';
import {
	InnerBlocks,
	__experimentalBlock as Block,
} from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { BUTTONS_CLASS, selectors } from './utils';
import {
	CORE_EDIT_POST_STORE_NAME,
	CORE_BLOCK_EDITOR_STORE_NAME,
} from '../../constants';
import useDynamicCss from '../../hooks/use-dynamic-css';
import { useBlockMemo } from '../../hooks/use-block-memo';
import Inspector from './inspector';
import VariationsPicker from '../../block/variations-picker';
import { BUTTON_BLOCK_NAME } from '../button/utils';

const ALLOWED_BLOCKS = [ BUTTON_BLOCK_NAME ];

export default function Edit( props ) {
	const { devices, buttonCount } = useSelect(
		( select ) => {
			return {
				devices: select(
					CORE_EDIT_POST_STORE_NAME
				).__experimentalGetPreviewDeviceType(),
				buttonCount: select(
					CORE_BLOCK_EDITOR_STORE_NAME
				).getBlockCount( props.clientId ),
			};
		},
		[ props.clientId ]
	);
	const blockMemo = useBlockMemo( props.attributes, selectors );
	useDynamicCss( props, devices );

	return (
		<>
			<Inspector
				{ ...props }
				blockMemo={ blockMemo }
				devices={ devices }
			/>
			{ buttonCount > 0 && (
				<InnerBlocks
					allowedBlocks={ ALLOWED_BLOCKS }
					orientation="horizontal"
					__experimentalTagName={ Block.div }
					__experimentalPassedProps={ {
						className: `${ BUTTONS_CLASS } ${ props.attributes.uidClass }`,
					} }
					renderAppender={ false }
				/>
			) }
			{ buttonCount === 0 && <VariationsPicker { ...props } /> }
		</>
	);
}
