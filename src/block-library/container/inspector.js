/**
 * WordPress dependencies
 */
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import { applyFilters } from '@wordpress/hooks';
import { __, sprintf } from '@wordpress/i18n';

/**
 * ScBlocks dependencies
 */
import {
	IdClassesControls,
	ControlsManager,
	BLOCK_SELECTOR,
} from '@scblocks/block';
import { SelectHtmlTag } from '@scblocks/components';
import { setPropsForVariousSelectors } from '@scblocks/css-utils';
import { DESKTOP_DEVICE } from '@scblocks/constants';

/**
 * Internal dependencies
 */
import ContentWidth from './content-width';
import ShapeDividerControls from './shape-divider-controls';
import OpenShapeLibrary from './open-shape-library';

function getUid() {
	return Math.random().toString( 16 ).substr( 2, 7 );
}

/* eslint-disable @wordpress/i18n-translator-comments */
export default function Inspector( props ) {
	const { attributes, setAttributes } = props;
	const { tag, shapeDividers } = attributes;
	function setTag( value ) {
		setAttributes( { tag: value } );
	}
	function onSelectShape( shape ) {
		const shapes = [ ...shapeDividers ];
		const shapeId = getUid();
		shapes.push( {
			shape,
			id: shapeId,
		} );
		setAttributes( { shapeDividers: shapes } );
		setPropsForVariousSelectors( {
			attributes,
			setAttributes,
			devices: DESKTOP_DEVICE,
			props: {
				[ BLOCK_SELECTOR.container.shapeSvg.alias( shapeId ) ]: {
					height: '100px',
					position: 'relative',
					left: '50%',
					transform: 'translateX(-50%)',
					minWidth: '100%',
				},
				[ BLOCK_SELECTOR.container.shape.alias( shapeId ) ]: {
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
						{ shapeDividers.map( ( shape, index ) => {
							return (
								<PanelBody
									key={ index }
									title={ sprintf(
										__( 'Shape %s', 'scblocks' ),
										index + 1
									) }
									initialOpen={ false }
								>
									<ShapeDividerControls
										{ ...props }
										shapeSelector={ BLOCK_SELECTOR.container.shape.alias(
											shape.id
										) }
										shapeSvgSelector={ BLOCK_SELECTOR.container.shapeSvg.alias(
											shape.id
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
