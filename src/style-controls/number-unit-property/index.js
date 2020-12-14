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
 * ScBlocks dependencies
 */
import { NumberUnit, propertyService } from '@scblocks/components';

const propDefaults = {
	height: {
		label: __( 'Height', 'scblocks' ),
		units: [ 'px', '%', 'vw', 'vh' ],
		unitRangeStep: {
			px: {
				max: 1440,
			},
		},
	},
	maxHeight: {
		label: __( 'Max-height', 'scblocks' ),
		units: [ 'px', '%', 'vw', 'vh' ],
		unitRangeStep: {
			px: {
				max: 1440,
			},
		},
	},
	minHeight: {
		label: __( 'Min-height', 'scblocks' ),
		units: [ 'px', '%', 'vw', 'vh' ],
		unitRangeStep: {
			px: {
				max: 1440,
			},
		},
	},
	width: {
		label: __( 'Width', 'scblocks' ),
		units: [ 'px', '%', 'vw', 'vh' ],
		unitRangeStep: {
			px: {
				max: 1000,
			},
		},
	},
	minWidth: {
		label: __( 'Min-width', 'scblocks' ),
		units: [ 'px', '%', 'vw', 'vh' ],
		unitRangeStep: {
			px: {
				max: 1000,
			},
		},
	},
	maxWidth: {
		label: __( 'Max-width', 'scblocks' ),
		units: [ 'px', '%', 'vw', 'vh' ],
		unitRangeStep: {
			px: {
				max: 1000,
			},
		},
	},
	fontSize: {
		label: __( 'Icon size', 'scblocks' ),
		units: [ 'px', 'em' ],
		unitRangeStep: {},
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
