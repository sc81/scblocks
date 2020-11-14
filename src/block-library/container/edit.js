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
import { useEffect } from '@wordpress/element';
import { applyFilters } from '@wordpress/hooks';

/**
 * Internal dependencies
 */
import { CONTAINER_SELECTORS_SETTINGS } from './utils';
import {
	CORE_BLOCK_EDITOR_STORE_NAME,
	CORE_EDIT_POST_STORE_NAME,
} from '../../constants';
import { useBlockMemo } from '../../hooks/use-block-memo';
import useDynamicCss from '../../hooks/use-dynamic-css';
import Inspector from './inspector';
import { BLOCK_CLASSES, BLOCK_SELECTOR } from '../../block/constants';
import VariationsPicker from '../../block/variations-picker';
import GoogleFontsLink from '../../block/google-fonts-link';

export default function Edit( props ) {
	const { attributes, setAttributes, clientId } = props;
	const { uidClass, htmlClass, htmlId } = attributes;
	const { devices, innerBlockCount, isRootContainer } = useSelect(
		( select ) => {
			const { getBlockCount, getBlockHierarchyRootClientId } = select(
				CORE_BLOCK_EDITOR_STORE_NAME
			);
			return {
				innerBlockCount: getBlockCount( clientId ),
				devices: select( CORE_EDIT_POST_STORE_NAME )
					.__experimentalGetPreviewDeviceType()
					.toLowerCase(),
				isRootContainer:
					getBlockHierarchyRootClientId( clientId ) === clientId,
			};
		},
		[ clientId ]
	);

	useEffect( () => {
		setAttributes( { isRootContainer } );
	}, [ isRootContainer, setAttributes ] );

	const selectorsSettings = applyFilters(
		'scblocks.container.selectorsSettings',
		CONTAINER_SELECTORS_SETTINGS,
		BLOCK_SELECTOR
	);

	useDynamicCss( props, devices );

	const blockMemo = useBlockMemo( attributes, selectorsSettings );

	const htmlAttributes = applyFilters(
		'scblocks.container.htmlAttributes',
		{
			id: !! htmlId ? htmlId : undefined,
			className: classnames( {
				[ BLOCK_CLASSES.container.main ]: true,
				[ uidClass ]: true,
				[ BLOCK_CLASSES.container.rootContainer ]: isRootContainer,
				[ `${ htmlClass }` ]: '' !== htmlClass,
			} ),
		},
		attributes
	);

	return (
		<>
			<Inspector
				{ ...props }
				devices={ devices }
				blockMemo={ blockMemo }
				selectorsSettings={ selectorsSettings }
			/>
			<Block.div { ...htmlAttributes }>
				<GoogleFontsLink attributes={ attributes } />
				{ applyFilters(
					'scblocks.container.inside',
					null,
					attributes
				) }
				{ innerBlockCount > 0 && (
					<InnerBlocks
						templateLock={ false }
						__experimentalTagName="div"
						__experimentalPassedProps={ {
							className: BLOCK_CLASSES.container.content,
						} }
					/>
				) }
				{ innerBlockCount === 0 && <VariationsPicker { ...props } /> }
			</Block.div>
		</>
	);
}
