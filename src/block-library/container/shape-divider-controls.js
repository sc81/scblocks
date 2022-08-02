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
	getPropValue,
	removeSelectors,
	setPropsForVariousSelectors,
	setPropsValue,
	setPropValue,
} from '@scblocks/css-utils';
import { ALL_DEVICES, DESKTOP_DEVICE } from '@scblocks/constants';
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

	const { zIndex, transform, color } = getPropertiesValue( {
		attributes,
		devices: ALL_DEVICES,
		selector: shapeSelector,
		props: [ 'zIndex', 'transform', 'color' ],
	} );
	const scaleX = transform.includes( 'scaleX' );
	const scaleY = transform.includes( 'scaleY' );

	const top = getPropValue( {
		attributes,
		devices: DESKTOP_DEVICE,
		selector: shapeSelector,
		propName: 'top',
	} );
	let location = 'bottom';
	if ( top ) {
		location = 'top';
	}

	const { width, height } = getPropertiesValue( {
		attributes,
		devices,
		selector: shapeSvgSelector,
		props: [ 'width', 'height' ],
	} );

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
		if ( propName.includes( 'scale' ) ) {
			const next = {
				scaleX: scaleX ? 'scaleX(-1)' : '',
				scaleY: scaleY ? 'scaleY(-1)' : '',
			};
			if ( propName === 'scaleX' ) {
				next.scaleX = value ? 'scaleX(-1)' : '';
			}
			if ( propName === 'scaleY' ) {
				next.scaleY = value ? 'scaleY(-1)' : '';
			}

			value = Object.values( next ).join( ' ' ).trim();
			propName = 'transform';
		}
		setPropValue( {
			attributes,
			setAttributes,
			selector: shapeSelector,
			devices: ALL_DEVICES,
			propName,
			value,
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
			devices: DESKTOP_DEVICE,
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
		setAttributes( { shapeDividers: shapes.length ? shapes : undefined } );
		if ( ! shapes.length ) {
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
						position: '',
					},
					[ BLOCK_SELECTOR.container.content.alias ]: {
						position: '',
					},
				},
			} );
			removeSelectors( {
				attributes: attrs,
				setAttributes,
				selectors: [ shapeSelector, shapeSvgSelector ],
			} );
		} else {
			removeSelectors( {
				attributes,
				setAttributes,
				selectors: [ shapeSelector, shapeSvgSelector ],
			} );
		}
	}
	function replaceShape( shape ) {
		const shapes = [ ...shapeDividers ];
		shapes[ index ] = {
			...shapes[ index ],
			id: shape.id,
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
					isClearButton={ !! width }
					onClear={ () => changeShapeSvgProp( 'width', '' ) }
					isSlider
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
					isClearButton={ !! height }
					onClear={ () => changeShapeSvgProp( 'height', '' ) }
					isSlider
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
