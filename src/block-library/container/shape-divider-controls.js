/**
 * WordPress dependencies
 */
import {
	SelectControl,
	ToggleControl,
	Button,
	ButtonGroup,
	BaseControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * ScBlocks dependencies
 */
import {
	OpenColorPicker,
	NumberUnit,
	NumberControl,
} from '@scblocks/components';
import {
	getPropertiesValue,
	removeSelectors,
	setPropsValue,
	setPropValue,
} from '@scblocks/css-utils';
import { ALL_DEVICES } from '@scblocks/constants';
import { BLOCK_SELECTOR } from '@scblocks/block';

/**
 * Internal dependencies
 */
import OpenShapeLibrary from './open-shape-library';

export default function ShapeDividerControls( {
	attributes,
	setAttributes,
	devices,
	shapeSvgSelector,
	shapeSelector,
	index,
} ) {
	const { shapeDividers } = attributes;

	const { zIndex, transform, color, top } = getPropertiesValue( {
		attributes,
		devices: ALL_DEVICES,
		selector: shapeSelector,
		props: [ 'zIndex', 'transform', 'color', 'top' ],
	} );
	const scaleX = transform.includes( 'scaleX' );
	const scaleY = transform.includes( 'scaleY' );

	const { width, height } = getPropertiesValue( {
		attributes,
		devices,
		selector: shapeSvgSelector,
		props: [ 'width', 'height' ],
	} );
	let location = 'bottom';
	if ( top ) {
		location = 'top';
	}
	function changeShapeSvgProp( propName, value ) {
		setPropValue( {
			attributes,
			setAttributes,
			selector: shapeSvgSelector,
			devices,
			propName,
			value,
		} );
	}
	function changeShapeProp( propName, value ) {
		let nextValue = '';
		if ( propName.includes( 'scale' ) ) {
			const next = {
				scaleX: scaleX ? 'scaleX(-1)' : '',
				scaleY: scaleY ? 'scaleY(-1)' : '',
			};
			if(propName === 'scaleX'){
				next.scaleX = value ? 'scaleX(-1)' : '';
			}
			if(propName === 'scaleY'){
				next.scaleY = value ? 'scaleY(-1)' : '';
			}
			
			nextValue = Object.values( next ).join( ' ' ).trim();
			propName = 'transform';
		}
		setPropValue( {
			attributes,
			setAttributes,
			selector: shapeSelector,
			devices: ALL_DEVICES,
			propName,
			value: nextValue,
		} );
	}
	function onChangeLocation( value ) {
		let nextTop, nextBottom;
		if ( value === 'top' ) {
			nextTop = '-1px';
			nextBottom = '';
		} else {
			nextTop = '';
			nextBottom = '-1px';
		}
		setPropsValue( {
			attributes,
			setAttributes,
			devices: ALL_DEVICES,
			selector: shapeSelector,
			props: {
				top: nextTop,
				bottom: nextBottom,
			},
		} );
	}
	function removeShape() {
		const shapes = [ ...shapeDividers ];
		shapes.splice( index, 1 );
		setAttributes( { shapeDividers: shapes } );
		const shapeId = shapeDividers[ index ].id;
		removeSelectors( {
			attributes,
			setAttributes,
			selectors: [
				BLOCK_SELECTOR.container.shape.alias( shapeId ),
				BLOCK_SELECTOR.container.shapeSvg.alias( shapeId ),
			],
		} );
	}
	function replaceShape( shape ) {
		const shapes = [ ...shapeDividers ];
		shapes[ index ] = {
			...shapes[ index ],
			shape,
		};
		setAttributes( {
			shapeDividers: shapes,
		} );
	}
	return (
		<>
			<BaseControl>
				<ButtonGroup>
					<OpenShapeLibrary
						label={ __( 'Replace', 'scblocks' ) }
						onSelectShape={ replaceShape }
					/>
					<Button isSecondary onClick={ removeShape }>
						{ __( 'Remove', 'scblocks' ) }
					</Button>
				</ButtonGroup>
			</BaseControl>
			<SelectControl
				label={ __( 'Location', 'scblocks' ) }
				value={ location }
				options={ [
					{ label: __( 'Top', 'scblocks' ), value: 'top' },
					{ label: __( 'Bottom', 'scblocks' ), value: 'bottom' },
				] }
				onChange={ onChangeLocation }
			/>
			<OpenColorPicker
				label={ __( 'Color', 'scblocks' ) }
				value={ color }
				onChange={ ( value ) => changeShapeProp( 'color', value ) }
			/>
			<BaseControl>
				<NumberUnit
					label={ __( 'Width', 'scblocks' ) }
					value={ width }
					units={ [ '%' ] }
					onChange={ ( value ) =>
						changeShapeSvgProp( 'width', value )
					}
					unitRangeStep={ { '%': { min: 100, max: 1000 } } }
					displayClearButton={ !! width }
					onClear={ () => changeShapeSvgProp( 'width', '' ) }
					withoutSlider
				/>
			</BaseControl>
			<BaseControl>
				<NumberUnit
					label={ __( 'Height', 'scblocks' ) }
					value={ height }
					units={ [ 'px' ] }
					onChange={ ( value ) =>
						changeShapeSvgProp( 'height', value )
					}
					unitRangeStep={ { px: { min: 0, max: 10000 } } }
					displayClearButton={ !! height }
					onClear={ () => changeShapeSvgProp( 'height', '' ) }
					withoutSlider
				/>
			</BaseControl>
			<NumberControl
				label={ __( 'z-index', 'scblocks' ) }
				value={ zIndex }
				onChange={ ( value ) => changeShapeProp( 'zIndex', value ) }
				withoutSelectDevices
				min={ 0 }
				max={ 999999 }
				step={ 1 }
				hasSlider={ false }
			/>
			<ToggleControl
				label={ __( 'Flip Horizontally', 'scblocks' ) }
				checked={ scaleX }
				onChange={ ( value ) => changeShapeProp( 'scaleX', value ) }
			/>
			<ToggleControl
				label={ __( 'Flip Vertically', 'scblocks' ) }
				checked={ scaleY }
				onChange={ ( value ) => changeShapeProp( 'scaleY', value ) }
			/>
		</>
	);
}
