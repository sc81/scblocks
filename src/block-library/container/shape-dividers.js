/**
 * ScBlocks dependencies
 */
import { BLOCK_CLASSES } from '@scblocks/block';
/**
 * Internal dependencies
 */
import useLoadShapes from './load-shapes';

export default function ShapeDividers( { attributes: { shapeDividers } } ) {
	const [ shapes, isLoaded ] = useLoadShapes();
	if ( ! shapeDividers ) {
		return null;
	}
	return (
		<div className={ BLOCK_CLASSES.container.shapes }>
			{ isLoaded &&
				shapeDividers.map( ( shapeDivider, index ) => {
					return (
						<div
							key={ index }
							className={ `${ BLOCK_CLASSES.container.shape } ${ BLOCK_CLASSES.container.shape }-${ shapeDivider.uidClass }` }
							dangerouslySetInnerHTML={ {
								__html: shapes.find(
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
