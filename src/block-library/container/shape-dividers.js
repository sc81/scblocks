/**
 * ScBlocks dependencies
 */
import { BLOCK_CLASSES } from '@scblocks/block';

export default function ShapeDividers( {
	attributes: { shapeDividers },
	svgShapes,
} ) {
	if ( ! shapeDividers ) {
		return null;
	}
	return (
		<div className={ BLOCK_CLASSES.container.shapes }>
			{ svgShapes &&
				svgShapes.length &&
				shapeDividers.map( ( shapeDivider, index ) => {
					return (
						<div
							key={ index }
							className={ `${ BLOCK_CLASSES.container.shape } ${ BLOCK_CLASSES.container.shape }-${ shapeDivider.uidClass }` }
							dangerouslySetInnerHTML={ {
								__html: svgShapes.find(
									( element ) =>
										element.id === shapeDivider.id
								).shape,
							} }
						/>
					);
				} ) }
		</div>
	);
}
