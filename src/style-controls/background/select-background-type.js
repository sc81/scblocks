/**
 * WordPress dependencies
 */
import { SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { PLUGIN_NAME } from '../../constants';

export default function SelectBackgroundType( {
	backgroundType,
	onChange,
	canShowBackgroundVideo,
	isHover,
} ) {
	return (
		<SelectControl
			className={ `${ PLUGIN_NAME }-select-control-inline` }
			label={ __( 'Background type', 'scblocks' ) }
			value={ backgroundType }
			options={ [
				{ label: __( 'Deafult', 'scblocks' ), value: '' },
				{ label: __( 'Image', 'scblocks' ), value: 'image' },
				{ label: __( 'Gradient', 'scblocks' ), value: 'gradient' },
				{
					label: __( 'Video', 'scblocks' ),
					value: 'video',
					disabled: ! canShowBackgroundVideo || isHover,
				},
			] }
			onChange={ onChange }
		/>
	);
}
