/**
 * WordPress dependencies
 */
import { Spinner, Button, Modal } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';

/**
 * ScBlocks dependencies
 */
import { PLUGIN_NAME, STORE_NAME } from '@scblocks/constants';
import { DangerouslyPasteIcon } from '@scblocks/components';

export default function ShapeLibrary( { onRequestClose, onSelectShape } ) {
	const svgShapes = useSelect(
		( select ) => select( STORE_NAME ).getSvgShapes(),
		[]
	);
	return (
		<Modal
			title={ __( 'Shape Library', 'scblocks' ) }
			onRequestClose={ onRequestClose }
		>
			{ ! svgShapes && (
				<div className={ `${ PLUGIN_NAME }-shape-library-spinner` }>
					<Spinner />
				</div>
			) }
			{ svgShapes && (
				<div className={ `${ PLUGIN_NAME }-shape-library-list` }>
					{ svgShapes.map( ( element, index ) => {
						return (
							<Button
								key={ index }
								isLarge
								onClick={ () => onSelectShape( element ) }
							>
								<DangerouslyPasteIcon icon={ element.shape } />
							</Button>
						);
					} ) }
					{ ! svgShapes.length && (
						<p>{ __( 'Shapes not found.', 'scblocks' ) }</p>
					) }
				</div>
			) }
		</Modal>
	);
}
