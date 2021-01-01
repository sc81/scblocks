/**
 * WordPress dependencies
 */
import { Button } from '@wordpress/components';
import { useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import ShapeLibrary from './shape-library';

export default function OpenShapeLibrary( { label, onSelectShape } ) {
	const [ isOpen, setIsOpen ] = useState( false );
	return (
		<>
			<Button isSecondary onClick={ () => setIsOpen( true ) }>
				{ label }
			</Button>
			{ isOpen && (
				<ShapeLibrary
					onSelectShape={ ( shape ) => {
						onSelectShape( shape );
						setIsOpen( false );
					} }
					onRequestClose={ () => setIsOpen( false ) }
				/>
			) }
		</>
	);
}
