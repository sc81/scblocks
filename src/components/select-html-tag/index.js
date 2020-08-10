/**
 * WordPress dependencies
 */
import { SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export default function SelectHtmlTag( { value, onChange } ) {
	return (
		<SelectControl
			label={ __( 'HTML Tag', 'scblocks' ) }
			value={ value }
			onChange={ onChange }
			options={ [
				{ value: 'div', label: 'div' },
				{ value: 'header', label: 'header' },
				{ value: 'footer', label: 'footer' },
				{ value: 'nav', label: 'nav' },
				{ value: 'article', label: 'article' },
				{ value: 'section', label: 'section' },
				{ value: 'aside', label: 'aside' },
			] }
		/>
	);
}
