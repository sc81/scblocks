/**
 * Internal dependencies
 */
import { PLUGIN_NAME } from '../../constants';

const SHAPE_CLASS = `${ PLUGIN_NAME }-shape`;
const SHAPE_TOP_CLASS = `${ PLUGIN_NAME }-shape-top`;
const SHAPE_BOTTOM_CLASS = `${ PLUGIN_NAME }-shape-bottom`;

function Shape( { content, isNegative, additionalClass } ) {
	return (
		<div
			className={ `${ SHAPE_CLASS } ${ additionalClass }` }
			data-negative={ isNegative }
			dangerouslySetInnerHTML={ { __html: content } }
		></div>
	);
}

export default function ShapeDividers( { attributes, isEditMode } ) {
	const {
		shapeBottom,
		shapeTop,
		isNegativeTop,
		isNegativeBottom,
	} = attributes;

	if ( isEditMode ) {
		return (
			<>
				<Shape
					additionalClass={ SHAPE_TOP_CLASS }
					content={ shapeTop }
					isNegative={ isNegativeTop }
				/>
				<Shape
					additionalClass={ SHAPE_BOTTOM_CLASS }
					content={ shapeBottom }
					isNegative={ isNegativeBottom }
				/>
			</>
		);
	}
	return (
		<>
			{ shapeTop && (
				<Shape
					additionalClass={ SHAPE_TOP_CLASS }
					content={ shapeTop }
					isNegative={ isNegativeTop }
				/>
			) }
			{ shapeBottom && (
				<Shape
					additionalClass={ SHAPE_BOTTOM_CLASS }
					content={ shapeBottom }
					isNegative={ isNegativeBottom }
				/>
			) }
		</>
	);
}
