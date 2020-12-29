/**
 * WordPress dependencies
 */
import { Spinner, Button, Modal } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * ScBlocks dependencies
 */
import { PLUGIN_NAME } from '@scblocks/constants';
import { DangerouslyPasteIcon } from '@scblocks/components';

/**
 * Internal dependencies
 */
import useLoadShapes from './load-shapes';

export default function ShapeLibrary( { onRequestClose, onSelectShape } ) {
	const [ shapes, isLoaded ] = useLoadShapes();
	return (
		<Modal
			title={ __( 'Shape Library', 'scblocks' ) }
			onRequestClose={ onRequestClose }
		>
			{ ! isLoaded && (
				<div className={ `${ PLUGIN_NAME }-shape-library-spinner` }>
					<Spinner />
				</div>
			) }
			{ isLoaded && (
				<div className={ `${ PLUGIN_NAME }-shape-library-list` }>
					{ shapes.map( ( element, index ) => {
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
					{ ! shapes && (
						<p>{ __( 'No results found.', 'scblocks' ) }</p>
					) }
				</div>
			) }
		</Modal>
	);
}
