/**
 * WordPress dependencies
 */
import { TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export default function IdClassesControls( {
	setAttributes,
	attributes: { htmlId, htmlClass },
} ) {
	return (
		<>
			<TextControl
				label={ __( 'Element ID', 'scblocks' ) }
				value={ htmlId }
				onChange={ ( value ) => {
					const nextId = value.replace( /[\s#\\'"\.]/g, '-' );

					setAttributes( {
						htmlId: nextId,
					} );
				} }
			/>
			<TextControl
				label={ __( 'CSS Classes', 'scblocks' ) }
				value={ htmlClass }
				onChange={ ( value ) => {
					const nextValue = value.replace( /[\\'",\.]/g, '-' );
					setAttributes( {
						htmlClass: nextValue,
					} );
				} }
			/>
		</>
	);
}
