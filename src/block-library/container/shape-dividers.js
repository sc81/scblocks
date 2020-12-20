import { BLOCK_CLASSES } from '@scblocks/block';

export default function ShapeDividers( { attributes: { shapeDividers } } ) {
	if ( shapeDividers.length === 0 ) {
		return null;
	}
	return (
		<div className={ BLOCK_CLASSES.container.shapes }>
			{ shapeDividers.map( ( element, index ) => {
				return (
					<div
						key={ index }
						className={ `${ BLOCK_CLASSES.container.shape } ${ BLOCK_CLASSES.container.shape }-${ element.dataId }` }
						data-id={ element.dataId }
						dangerouslySetInnerHTML={ {
							__html: element.shape,
						} }
					/>
				);
			} ) }
		</div>
	);
}
