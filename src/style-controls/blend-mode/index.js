/**
 * WordPress dependencies
 */
import { SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import propertyService from '../property-service';
import { PLUGIN_NAME } from '../../constants';

const propName = 'mixBlendMode';

export default function BlendMode( props ) {
	const { propValue, onChange } = propertyService( {
		...props,
		propName,
	} );
	return (
		<SelectControl
			className={ `${ PLUGIN_NAME }-select-control-inline` }
			label={ __( 'Blend mode' ) }
			value={ propValue }
			options={ [
				{ label: 'Normal', value: '' },
				{ label: 'Multiply', value: 'multiply' },
				{ label: 'Screen', value: 'screen' },
				{ label: 'Overlay', value: 'overlay' },
				{ label: 'Lighten', value: 'lighten' },
				{ label: 'Color dodge', value: 'color-dodge' },
				{ label: 'Hard light', value: 'hard-light' },
				{ label: 'Soft light', value: 'soft-light' },
				{ label: 'Difference', value: 'differnece' },
				{ label: 'Exclusion', value: 'exclusion' },
				{ label: 'Hue', value: 'hue' },
				{ label: 'Saturation', value: 'saturation' },
				{ label: 'Color', value: 'color' },
				{ label: 'Luminosity', value: 'luminosity' },
			] }
			onChange={ onChange }
		/>
	);
}
