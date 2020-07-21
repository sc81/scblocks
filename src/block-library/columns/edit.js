/**
 * WordPress dependencies
 */
import {
	InnerBlocks,
	__experimentalBlock as Block,
	InspectorControls,
} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import {
	CORE_BLOCK_EDITOR_STORE_NAME,
	CORE_EDIT_POST_STORE_NAME,
} from '../../constants';
import { selectors, COLUMNS_CLASS } from './utils';
import useDynamicCss from '../../hooks/use-dynamic-css';
import { useBlockMemo } from '../../hooks/use-block-memo';
import VariationsPicker from './variations-picker';
import { COLUMN_NAME } from '../column/utils';
import ControlsManager from '../../components/controls-manager';

const ALLOWED_BLOCKS = [ COLUMN_NAME ];

export default function Edit( props ) {
	const { attributes, setAttributes, clientId } = props;
	const { uidClass } = attributes;

	const { devices, columnCount } = useSelect(
		( select ) => {
			return {
				devices: select(
					CORE_EDIT_POST_STORE_NAME
				).__experimentalGetPreviewDeviceType(),
				columnCount: select(
					CORE_BLOCK_EDITOR_STORE_NAME
				).getBlockCount( clientId ),
			};
		},
		[ clientId ]
	);

	const blockMemo = useBlockMemo( attributes, selectors );
	useDynamicCss( props, devices );

	return (
		<>
			<InspectorControls>
				<ControlsManager
					selectors={ selectors }
					setAttributes={ setAttributes }
					attributes={ attributes }
					devices={ devices }
					blockMemo={ blockMemo }
				/>
			</InspectorControls>
			{ columnCount > 0 && (
				<InnerBlocks
					allowedBlocks={ ALLOWED_BLOCKS }
					__experimentalMoverDirection="horizontal"
					__experimentalTagName={ Block.div }
					__experimentalPassedProps={ {
						className: `${ COLUMNS_CLASS } ${ uidClass }`,
					} }
					renderAppender={ false }
				/>
			) }
			{ columnCount === 0 && <VariationsPicker { ...props } /> }
		</>
	);
}
