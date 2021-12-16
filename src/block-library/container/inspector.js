/**
 * WordPress dependencies
 */
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';
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
import { ALL_DEVICES, DESKTOP_DEVICE } from '@scblocks/constants';

/**
 * Internal dependencies
 */
import ShapeDividerControls from './shape-divider-controls';
import OpenShapeLibrary from './open-shape-library';

function getUid() {
	return Math.random().toString( 16 ).substr( 2, 7 );
}

export default function Inspector( props ) {
	const { attributes, setAttributes, svgShapes } = props;
	const { tag, shapeDividers, useThemeContentWidth } = attributes;

	function setTag( value ) {
		setAttributes( { tag: value } );
	}
	function onSelectShape( shape ) {
		let nextShapes = [];
		if ( shapeDividers ) {
			nextShapes = [ ...shapeDividers ];
		}
		const shapeUidClass = getUid();
		nextShapes.push( {
			id: shape.id,
			uidClass: shapeUidClass,
		} );
		setAttributes( { shapeDividers: nextShapes } );

		const attrs = {
			css: {},
		};
		function setAttrs( next ) {
			attrs.css = next.css;
		}
		setPropsForVariousSelectors( {
			attributes,
			setAttributes: setAttrs,
			devices: ALL_DEVICES,
			props: {
				[ BLOCK_SELECTOR.container.main.alias ]: {
					position: 'relative',
				},
				[ BLOCK_SELECTOR.container.content.alias ]: {
					position: 'relative',
				},
				[ BLOCK_SELECTOR.container.shapeSvg.alias( shapeUidClass ) ]: {
					position: 'relative',
				},
			},
		} );
		setPropsForVariousSelectors( {
			attributes: attrs,
			setAttributes,
			devices: DESKTOP_DEVICE,
			props: {
				[ BLOCK_SELECTOR.container.shapeSvg.alias( shapeUidClass ) ]: {
					height: '100px',
					left: '50%',
					transform: 'translateX(-50%)',
					minWidth: '100%',
				},
				[ BLOCK_SELECTOR.container.shape.alias( shapeUidClass ) ]: {
					left: '0',
					right: '0',
					bottom: '-1px',
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
						<ToggleControl
							label={ __(
								'Use Theme Content Width',
								'scblocks'
							) }
							checked={ useThemeContentWidth }
							onChange={ ( value ) =>
								setAttributes( { useThemeContentWidth: value } )
							}
						/>
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
				shapesPanelControls={
					<>
						{ svgShapes &&
							svgShapes.length &&
							shapeDividers &&
							shapeDividers.map( ( shapeDivider, index ) => {
								const shape = svgShapes.find(
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
