/**
 * WordPress dependencies
 */
import { TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export default function IdClassesControls( {
	setAttributes,
	attributes: { elementId, cssClasses },
} ) {
	return (
		<>
			<TextControl
				label={ __( 'Element ID', 'scblocks' ) }
				value={ elementId }
				onChange={ ( value ) => {
					const nextId = value.replace( /[\s#\\'"\.]/g, '-' );

					setAttributes( {
						elementId: nextId,
					} );
				} }
			/>

			<TextControl
				label={ __( 'CSS Classes', 'scblocks' ) }
				value={ cssClasses }
				onChange={ ( value ) => {
					const nextValue = value.replace( /[\\'",\.]/g, '-' );
					setAttributes( {
						cssClasses: nextValue,
					} );
				} }
			/>
		</>
	);
}
