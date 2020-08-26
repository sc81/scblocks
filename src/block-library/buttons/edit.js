/**
 * WordPress dependencies
 */
import { useSelect } from '@wordpress/data';
import {
	InnerBlocks,
	__experimentalBlock as Block,
	InspectorControls,
} from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { selectorsSettings } from './utils';
import {
	CORE_EDIT_POST_STORE_NAME,
	CORE_BLOCK_EDITOR_STORE_NAME,
} from '../../constants';
import useDynamicCss from '../../hooks/use-dynamic-css';
import { useBlockMemo } from '../../hooks/use-block-memo';
import VariationsPicker from '../../block/variations-picker';
import { BUTTON_BLOCK_NAME } from '../button/utils';
import { BLOCK_CLASSES } from '../../block/constants';
import ControlsManager from '../../components/controls-manager';

const ALLOWED_BLOCKS = [ BUTTON_BLOCK_NAME ];

export default function Edit( props ) {
	const { attributes, setAttributes, clientId } = props;
	const { devices, buttonCount } = useSelect(
		( select ) => {
			return {
				devices: select(
					CORE_EDIT_POST_STORE_NAME
				).__experimentalGetPreviewDeviceType(),
				buttonCount: select(
					CORE_BLOCK_EDITOR_STORE_NAME
				).getBlockCount( clientId ),
			};
		},
		[ clientId ]
	);
	const blockMemo = useBlockMemo( attributes, selectorsSettings );
	useDynamicCss( props, devices );

	return (
		<>
			<InspectorControls>
				<ControlsManager
					selectorsSettings={ selectorsSettings }
					setAttributes={ setAttributes }
					attributes={ attributes }
					devices={ devices }
					blockMemo={ blockMemo }
				/>
			</InspectorControls>
			{ buttonCount > 0 && (
				<InnerBlocks
					allowedBlocks={ ALLOWED_BLOCKS }
					orientation="horizontal"
					__experimentalTagName={ Block.div }
					__experimentalPassedProps={ {
						className: `${ BLOCK_CLASSES.buttons.main } ${ attributes.uidClass }`,
					} }
					renderAppender={ false }
				/>
			) }
			{ buttonCount === 0 && <VariationsPicker { ...props } /> }
		</>
	);
}
