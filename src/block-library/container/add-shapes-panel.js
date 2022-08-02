/**
 * WordPress dependencies
 */
import { PanelBody, BaseControl } from '@wordpress/components';
import { addFilter } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';

/**
 * ScBlocks dependencies
 */
import { BLOCK_SELECTOR } from '@scblocks/block';
import { DangerouslyPasteIcon } from '@scblocks/components';
import { setPropsForVariousSelectors } from '@scblocks/css-utils';
import { ALL_DEVICES, DESKTOP_DEVICE } from '@scblocks/constants';

/**
 * Internal dependencies
 */
import ShapeDividerControls from './shape-divider-controls';
import OpenShapeLibrary from './open-shape-library';

function getUid() {
	return Math.random().toString( 16 ).substring( 2, 7 );
}

function shapesPanel( c, props, panelsProps ) {
	const { attributes, setAttributes, svgShapes } = props;
	const { shapeDividers } = attributes;
	const { openedPanel, onClickPanel } = panelsProps;

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
		<PanelBody
			title={ __( 'Shapes', 'scblocks' ) }
			onToggle={ () => onClickPanel( 'shapes' ) }
			opened={ openedPanel === 'shapes' }
		>
			{ svgShapes &&
				svgShapes.length &&
				shapeDividers &&
				shapeDividers.map( ( shapeDivider, index ) => {
					const shape = svgShapes.find(
						( element ) => element.id === shapeDivider.id
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
			<BaseControl className="scblocks-add-shape-button">
				<OpenShapeLibrary
					label={ __( 'Add Shape', 'scblocks' ) }
					onSelectShape={ onSelectShape }
				/>
			</BaseControl>
		</PanelBody>
	);
}

addFilter(
	'scblocks.stylePanels.shapesPanel',
	'scblocks/stylePanels/shapesPanel',
	shapesPanel
);