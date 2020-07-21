/**
 * WordPress dependencies
 */
import {
	InnerBlocks,
	__experimentalBlock as Block,
	InspectorControls,
} from '@wordpress/block-editor';
import { useSelect, dispatch, select } from '@wordpress/data';
import { useRef } from '@wordpress/element';

/**
 * Internal dependencies
 */
import {
	COLUMN_CLASS,
	COLUMN_INNER_CLASS,
	selectors,
	COLUMN_SELECTOR,
} from './utils';
import {
	CORE_BLOCK_EDITOR_STORE_NAME,
	CORE_EDIT_POST_STORE_NAME,
} from '../../constants';
import useDynamicCss from '../../hooks/use-dynamic-css';
import ResizeBelt from '../../components/resize-belt';
import { setPropValue } from '../../utils';
import { useBlockMemo } from '../../hooks/use-block-memo';
import ControlsManager from '../../components/controls-manager';

export default function Edit( props ) {
	const { attributes, setAttributes, clientId, isSelected } = props;

	const columnRef = useRef();

	const {
		devices,
		hasChildBlocks,
		columnIndex,
		parentBlockOrder,
	} = useSelect(
		( store ) => {
			const parentId = store(
				CORE_BLOCK_EDITOR_STORE_NAME
			).getBlockRootClientId( clientId );
			return {
				devices: store(
					CORE_EDIT_POST_STORE_NAME
				).__experimentalGetPreviewDeviceType(),
				hasChildBlocks: store(
					CORE_BLOCK_EDITOR_STORE_NAME
				).getBlockCount( clientId ),
				columnIndex: store(
					CORE_BLOCK_EDITOR_STORE_NAME
				).getBlockIndex( clientId, parentId ),
				parentBlockOrder: store(
					CORE_BLOCK_EDITOR_STORE_NAME
				).getBlockOrder( parentId ),
			};
		},
		[ clientId ]
	);
	const blockMemo = useBlockMemo( attributes, selectors );
	useDynamicCss( props, devices );

	function onChangeColumnWidth( nextWidth, nextSiblingWidth ) {
		setPropValue( {
			attributes,
			setAttributes,
			selector: COLUMN_SELECTOR,
			devices,
			propName: 'flexBasis',
			value: nextWidth,
		} );
		const nextSiblingId = parentBlockOrder[ columnIndex + 1 ];
		const nextSiblingAttributes = select(
			CORE_BLOCK_EDITOR_STORE_NAME
		).getBlockAttributes( nextSiblingId );
		setPropValue( {
			attributes: nextSiblingAttributes,
			setAttributes: ( css ) =>
				dispatch( CORE_BLOCK_EDITOR_STORE_NAME ).updateBlockAttributes(
					nextSiblingId,
					css
				),
			selector: COLUMN_SELECTOR,
			devices,
			propName: 'flexBasis',
			value: nextSiblingWidth,
		} );
	}

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
			<Block.div
				className={ `${ COLUMN_CLASS } ${ attributes.uidClass }` }
				ref={ columnRef }
			>
				{ isSelected && columnIndex !== parentBlockOrder.length - 1 && (
					<ResizeBelt
						right
						clientRef={ columnRef }
						minWidth="50"
						calculateMaxWidth
						convertToPercent
						toFixed={ 2 }
						unit="%"
						onResizeEnd={ onChangeColumnWidth }
					/>
				) }
				<InnerBlocks
					templateLock={ false }
					renderAppender={
						hasChildBlocks
							? undefined
							: () => <InnerBlocks.ButtonBlockAppender />
					}
					__experimentalPassedProps={ {
						className: COLUMN_INNER_CLASS,
					} }
					__experimentalTagName="div"
				/>
			</Block.div>
		</>
	);
}
