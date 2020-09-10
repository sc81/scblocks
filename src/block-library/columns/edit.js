/**
 * External dependencies
 */
import classnames from 'classnames';

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
import {
	CORE_BLOCK_EDITOR_STORE_NAME,
	CORE_EDIT_POST_STORE_NAME,
} from '../../constants';
import { selectorsSettings } from './utils';
import useDynamicCss from '../../hooks/use-dynamic-css';
import { useBlockMemo } from '../../hooks/use-block-memo';
import VariationsPicker from '../../block/variations-picker';
import { COLUMN_NAME } from '../column/utils';
import Inspector from './inspector';
import { BLOCK_CLASSES } from '../../block/constants';

const ALLOWED_BLOCKS = [ COLUMN_NAME ];

export default function Edit( props ) {
	const { attributes, clientId } = props;
	const { uidClass, cssClasses } = attributes;

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

	const blockMemo = useBlockMemo( attributes, selectorsSettings );
	useDynamicCss( props, devices );

	const classes = classnames( {
		[ BLOCK_CLASSES.columns.main ]: true,
		[ uidClass ]: true,
		[ `${ cssClasses }` ]: '' !== cssClasses,
	} );

	return (
		<>
			<Inspector
				{ ...props }
				blockMemo={ blockMemo }
				devices={ devices }
			/>
			{ columnCount > 0 && (
				<InnerBlocks
					allowedBlocks={ ALLOWED_BLOCKS }
					__experimentalMoverDirection="horizontal"
					__experimentalTagName={ Block.div }
					__experimentalPassedProps={ {
						className: classes,
					} }
					renderAppender={ false }
				/>
			) }
			{ columnCount === 0 && <VariationsPicker { ...props } /> }
		</>
	);
}
