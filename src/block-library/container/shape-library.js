/**
 * WordPress dependencies
 */
import { Spinner, Button, Modal } from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';

/**
 * ScBlocks dependencies
 */
import { PLUGIN_NAME } from '@scblocks/constants';
import { DangerouslyPasteIcon } from '@scblocks/components';

let shapes;

let isLocked = false;

export default function ShapeLibrary( { onRequestClose, onSelectShape } ) {
	const [ isLoaded, setIsLoaded ] = useState( false );

	useEffect( () => {
		if ( ! isLocked ) {
			if ( ! shapes ) {
				apiFetch( {
					path: `/${ PLUGIN_NAME }/v1/shape-dividers`,
				} )
					.then( ( resp ) => {
						shapes = JSON.parse( resp );

						isLocked = false;
						setIsLoaded( true );
					} )
					.catch( () => {
						isLocked = false;
						setIsLoaded( true );
					} );
			} else {
				setIsLoaded( true );
			}
		}
	}, [] );
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
