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
import { selectorsSettings } from './utils';
import {
	CORE_BLOCK_EDITOR_STORE_NAME,
	CORE_EDIT_POST_STORE_NAME,
} from '../../constants';
import useDynamicCss from '../../hooks/use-dynamic-css';
import { useBlockMemo } from '../../hooks/use-block-memo';
import Inspector from './inspector';
import { BLOCK_CLASSES } from '../../block/constants';
import GoogleFontsLink from '../../block/google-fonts-link';

export default function Edit( props ) {
	const { attributes, clientId } = props;
	const { devices, hasChildBlocks } = useSelect(
		( store ) => {
			return {
				devices: store(
					CORE_EDIT_POST_STORE_NAME
				).__experimentalGetPreviewDeviceType(),
				hasChildBlocks: store(
					CORE_BLOCK_EDITOR_STORE_NAME
				).getBlockCount( clientId ),
			};
		},
		[ clientId ]
	);
	const blockMemo = useBlockMemo( attributes, selectorsSettings );
	useDynamicCss( props, devices );

	const classes = classnames( {
		[ BLOCK_CLASSES.column.main ]: true,
		[ attributes.uidClass ]: true,
		[ BLOCK_CLASSES.column.col ]: true,
		[ `${ attributes.cssClasses }` ]: '' !== attributes.cssClasses,
	} );

	return (
		<>
			<Inspector
				{ ...props }
				blockMemo={ blockMemo }
				devices={ devices }
			/>
			<Block.div className={ classes }>
				<GoogleFontsLink attributes={ attributes } />
				<div className={ BLOCK_CLASSES.column.inner }>
					<InnerBlocks
						templateLock={ false }
						renderAppender={
							hasChildBlocks
								? undefined
								: () => <InnerBlocks.ButtonBlockAppender />
						}
						__experimentalPassedProps={ {
							className: BLOCK_CLASSES.column.content,
						} }
						__experimentalTagName="div"
					/>
				</div>
			</Block.div>
		</>
	);
}
