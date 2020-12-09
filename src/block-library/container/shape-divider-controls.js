/**
 * WordPress dependencies
 */
import {
	SelectControl,
	TextControl,
	ToggleControl,
	Button,
	ButtonGroup,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * ScBlocks dependencies
 */
import { OpenColorPicker } from '@scblocks/components';
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
	const { fill, transform: flip } = getPropertiesValue( {
		attributes,
		devices: ALL_DEVICES,
		selector: shapeSvgSelector,
		props: [ 'fill', 'transform' ],
	} );
	const { zIndex, top } = getPropertiesValue( {
		attributes,
		devices: ALL_DEVICES,
		selector: shapeSelector,
		props: [ 'zIndex', 'top' ],
	} );
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
	function onChangeCssProp( propName, value ) {
		if ( propName === 'transform' ) {
			value = value ? 'rotateY(180deg)' : '';
		}
		setPropValue( {
			attributes,
			setAttributes,
			selector: propName === 'zIndex' ? shapeSelector : shapeSvgSelector,
			devices:
				propName === 'fill' ||
				propName === 'transform' ||
				propName === 'zIndex'
					? ALL_DEVICES
					: devices,
			propName,
			value,
		} );
	}
	function onChangeLocation( value ) {
		let nextTop, nextBottom, nextTransform;
		if ( value === 'top' ) {
			nextTop = '-1px';
			nextBottom = '';
			nextTransform = 'scaleY(-1)';
		} else {
			nextTop = '';
			nextBottom = '-1px';
			nextTransform = '';
		}
		setPropsValue( {
			attributes,
			setAttributes,
			devices: ALL_DEVICES,
			selector: shapeSelector,
			props: {
				top: nextTop,
				bottom: nextBottom,
				transform: nextTransform,
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
			<ButtonGroup>
				<OpenShapeLibrary
					label={ __( 'Replace', 'scblocks' ) }
					onSelectShape={ replaceShape }
				/>
				<Button isSecondary onClick={ removeShape }>
					{ __( 'Remove', 'scblocks' ) }
				</Button>
			</ButtonGroup>
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
				value={ fill }
				onChange={ ( value ) => onChangeCssProp( 'fill', value ) }
			/>
			<TextControl
				label={ __( 'Width', 'scblocks' ) }
				value={ width }
				onChange={ ( value ) => onChangeCssProp( 'width', value ) }
			/>
			<TextControl
				label={ __( 'Height', 'scblocks' ) }
				value={ height }
				onChange={ ( value ) => onChangeCssProp( 'height', value ) }
			/>
			<ToggleControl
				label={ __( 'Flip', 'scblocks' ) }
				checked={ !! flip }
				onChange={ ( value ) => onChangeCssProp( 'transform', value ) }
			/>
			<TextControl
				label={ __( 'z-index', 'scblocks' ) }
				value={ zIndex }
				onChange={ ( value ) => onChangeCssProp( 'zIndex', value ) }
			/>
		</>
	);
}
