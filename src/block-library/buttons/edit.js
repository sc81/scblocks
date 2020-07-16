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
import { PLUGIN_NAME, CORE_EDIT_POST_STORE_NAME } from '../../constants';
import useDynamicCss from '../../hooks/use-dynamic-css';
import { useBlockMemo } from '../../hooks/use-block-memo';
import Inspector from './inspector';

const ALLOWED_BLOCKS = [ `${ PLUGIN_NAME }/button` ];
const BUTTONS_TEMPLATE = [ [ `${ PLUGIN_NAME }/button` ] ];

export default function Edit( props ) {
	const devices = useSelect(
		( select ) =>
			select(
				CORE_EDIT_POST_STORE_NAME
			).__experimentalGetPreviewDeviceType(),
		[]
	);
	const blockMemo = useBlockMemo( props.attributes, selectors );
	useDynamicCss( props, devices, selectors );

	return (
		<>
			<Inspector
				{ ...props }
				blockMemo={ blockMemo }
				devices={ devices }
			/>
			<Block.div
				className={ `${ BUTTONS_CLASS } ${ props.attributes.uidClass }` }
			>
				<InnerBlocks
					allowedBlocks={ ALLOWED_BLOCKS }
					template={ BUTTONS_TEMPLATE }
					orientation="horizontal"
					renderAppender={ false }
				/>
			</Block.div>
		</>
	);
}
