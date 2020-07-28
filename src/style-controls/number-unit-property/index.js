/**
 * External dependencies
 */
import { cloneDeep, merge } from 'lodash';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useMemo } from '@wordpress/element';

/**
 * Internal dependencies
 */
import NumberUnit from '../../components/number-unit';
import propertyService from '../property-service';

const propDefaults = {
	height: {
		label: __( 'Height' ),
		units: [ 'px', '%', 'vw', 'vh' ],
		unitRangeStep: {
			px: {
				max: 1440,
			},
		},
	},
	maxHeight: {
		label: __( 'Max-height' ),
		units: [ 'px', '%', 'vw', 'vh' ],
		unitRangeStep: {
			px: {
				max: 1440,
			},
		},
	},
	minHeight: {
		label: __( 'Min-height' ),
		units: [ 'px', '%', 'vw', 'vh' ],
		unitRangeStep: {
			px: {
				max: 1440,
			},
		},
	},
	width: {
		label: __( 'Width' ),
		units: [ 'px', '%', 'vw', 'vh' ],
		unitRangeStep: {
			px: {
				max: 1000,
			},
		},
	},
	minWidth: {
		label: __( 'Min-width' ),
		units: [ 'px', '%', 'vw', 'vh' ],
		unitRangeStep: {
			px: {
				max: 1000,
			},
		},
	},
	maxWidth: {
		label: __( 'Max-width' ),
		units: [ 'px', '%', 'vw', 'vh' ],
		unitRangeStep: {
			px: {
				max: 1000,
			},
		},
	},
};

export default function NumberUnitProperty( props ) {
	const { propName, units, withoutSelectDevices, unitRangeStep } = props;
	const { propValue, onChange } = propertyService( props );

	const mergedUnitRangeStep = useMemo( () => {
		return merge(
			cloneDeep( propDefaults[ propName ].unitRangeStep ),
			unitRangeStep
		);
	}, [ propName, unitRangeStep, propDefaults ] );

	return (
		<NumberUnit
			label={ propDefaults[ propName ].label }
			value={ propValue }
			units={ units || propDefaults[ propName ].units }
			onChange={ onChange }
			withoutSelectDevices={
				withoutSelectDevices ||
				propDefaults[ propName ].withoutSelectDevices
			}
			unitRangeStep={ mergedUnitRangeStep }
			displayClearButton={ !! propValue }
			onClear={ () => onChange() }
		/>
	);
}
