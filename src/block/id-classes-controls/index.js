/**
 * WordPress dependencies
 */
import { TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { doAction } from '@wordpress/hooks';

export default function IdClassesControls( props ) {
	const {
		setAttributes,
		attributes: { htmlId, htmlClass },
	} = props;
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

					doAction( 'scblocks.afterChangeHtmlId', nextId, props );
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
