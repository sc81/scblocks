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
import { applyFilters } from '@wordpress/hooks';

/**
 * Internal dependencies
 */
import { COLUMN_SELECTORS_SETTINGS } from './utils';
import {
	CORE_BLOCK_EDITOR_STORE_NAME,
	CORE_EDIT_POST_STORE_NAME,
} from '../../constants';
import useDynamicCss from '../../hooks/use-dynamic-css';
import { useBlockMemo } from '../../hooks/use-block-memo';
import Inspector from './inspector';
import { BLOCK_CLASSES, BLOCK_SELECTOR } from '../../block/constants';
import GoogleFontsLink from '../../block/google-fonts-link';

export default function Edit( props ) {
	const { attributes, clientId } = props;
	const { htmlId, htmlClass, uidClass } = attributes;
	const { devices, hasChildBlocks } = useSelect(
		( store ) => {
			return {
				devices: store( CORE_EDIT_POST_STORE_NAME )
					.__experimentalGetPreviewDeviceType()
					.toLowerCase(),
				hasChildBlocks: store(
					CORE_BLOCK_EDITOR_STORE_NAME
				).getBlockCount( clientId ),
			};
		},
		[ clientId ]
	);
	const selectorsSettings = applyFilters(
		'scblocks.column.selectorsSettings',
		COLUMN_SELECTORS_SETTINGS,
		BLOCK_SELECTOR
	);
	const blockMemo = useBlockMemo( attributes, selectorsSettings );
	const style = useDynamicCss( props, devices );

	const htmlAttributes = applyFilters(
		'scblocks.column.htmlAttributes',
		{
			id: !! htmlId ? htmlId : undefined,
			className: classnames( {
				[ BLOCK_CLASSES.column.main ]: true,
				[ uidClass ]: true,
				[ `${ htmlClass }` ]: '' !== htmlClass,
			} ),
		},
		attributes
	);

	return (
		<>
			<style>{ style }</style>
			<Inspector
				{ ...props }
				blockMemo={ blockMemo }
				devices={ devices }
				selectorsSettings={ selectorsSettings }
			/>
			<Block.div { ...htmlAttributes }>
				<GoogleFontsLink attributes={ attributes } />
				<div className={ BLOCK_CLASSES.column.inner }>
					{ applyFilters(
						'scblocks.column.inside',
						null,
						attributes
					) }
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
