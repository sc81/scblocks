/**
 * WordPress dependencies
 */
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import { applyFilters } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';

/**
 * ScBlocks dependencies
 */
import {
	IdClassesControls,
	ControlsManager,
	BLOCK_SELECTOR,
} from '@scblocks/block';
import { DangerouslyPasteIcon, SelectHtmlTag } from '@scblocks/components';
import { setPropsForVariousSelectors } from '@scblocks/css-utils';
import { DESKTOP_DEVICE } from '@scblocks/constants';

/**
 * Internal dependencies
 */
import ContentWidth from './content-width';
import ShapeDividerControls from './shape-divider-controls';
import OpenShapeLibrary from './open-shape-library';
import useLoadShapes from './load-shapes';

function getUid() {
	return Math.random().toString( 16 ).substr( 2, 7 );
}

export default function Inspector( props ) {
	const { attributes, setAttributes } = props;
	const { tag, shapeDividers } = attributes;

	const [ shapes, isLoaded ] = useLoadShapes();

	function setTag( value ) {
		setAttributes( { tag: value } );
	}
	function onSelectShape( shape ) {
		const nextShapes = [ ...shapeDividers ];
		const shapeUidClass = getUid();
		nextShapes.push( {
			id: shape.id,
			uidClass: shapeUidClass,
		} );
		setAttributes( { shapeDividers: nextShapes } );
		setPropsForVariousSelectors( {
			attributes,
			setAttributes,
			devices: DESKTOP_DEVICE,
			props: {
				[ BLOCK_SELECTOR.container.shapeSvg.alias( shapeUidClass ) ]: {
					height: '100px',
					position: 'relative',
					left: '50%',
					transform: 'translateX(-50%)',
					minWidth: '100%',
				},
				[ BLOCK_SELECTOR.container.shape.alias( shapeUidClass ) ]: {
					left: '0',
					right: '0',
					bottom: '-1px',
				},
				[ BLOCK_SELECTOR.container.main.alias ]: {
					position: 'relative',
				},
				[ BLOCK_SELECTOR.container.content.alias ]: {
					position: 'relative',
				},
			},
		} );
	}
	return (
		<InspectorControls>
			<ControlsManager
				{ ...props }
				mainControls={ applyFilters(
					'scblocks.container.mainControls',
					<PanelBody opened>
						<SelectHtmlTag value={ tag } onChange={ setTag } />
					</PanelBody>,
					props
				) }
				htmlAttrsControls={ applyFilters(
					'scblocks.container.htmlAttrControls',
					<PanelBody opened>
						<IdClassesControls { ...props } />
					</PanelBody>,
					props
				) }
				spacePanelAdditionalControls={ <ContentWidth { ...props } /> }
				shapesPanelControls={
					<>
						{ isLoaded &&
							shapeDividers.map( ( shapeDivider, index ) => {
								const shape = shapes.find(
									( element ) =>
										element.id === shapeDivider.id
								);
								return (
									<PanelBody
										key={ index }
										title={
											<DangerouslyPasteIcon
												icon={ shape.shape }
												className="scblocks-panel-title-icon"
											/>
										}
										initialOpen={ false }
									>
										<ShapeDividerControls
											{ ...props }
											shapeSelector={ BLOCK_SELECTOR.container.shape.alias(
												shapeDivider.uidClass
											) }
											shapeSvgSelector={ BLOCK_SELECTOR.container.shapeSvg.alias(
												shapeDivider.uidClass
											) }
											index={ index }
										/>
									</PanelBody>
								);
							} ) }
						<PanelBody opened>
							<OpenShapeLibrary
								label={ __( 'Add Shape', 'scblocks' ) }
								onSelectShape={ onSelectShape }
							/>
						</PanelBody>
					</>
				}
			/>
		</InspectorControls>
	);
}
