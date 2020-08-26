/**
 * WordPress dependencies
 */
import { useMemo } from '@wordpress/element';

/**
 * Internal dependencies
 */
import usePanelActiveControl from '../../hooks/use-panel-active-control';
import NumberUnitProperty from '../number-unit-property';
import FourControls from '../four-controls';
import Separator from '../../components/separator';
import { getControlSelector } from '../utils';

const spaceProps = [
	'margin',
	'padding',
	'width',
	'minWidth',
	'maxWidth',
	'height',
	'minHeight',
	'maxHeight',
	'fontSize', // icon size
];

export default function Space( props ) {
	const { selectorSettings } = props;
	const {
		margin,
		padding,
		width,
		minWidth,
		maxWidth,
		height,
		minHeight,
		maxHeight,
		fontSize,
	} = usePanelActiveControl( selectorSettings, spaceProps, 'space' );

	const propSelector = useMemo( () => {
		const state = {};
		spaceProps.forEach( ( prop ) => {
			state[ prop ] = getControlSelector(
				'space',
				prop,
				selectorSettings
			);
		} );
		return state;
	} );

	const unitRangeStep = useMemo( () => {
		const state = {};
		const spacePanel = selectorSettings.allowedPanels.space;
		for ( const prop in spacePanel ) {
			state[ prop ] = {};
			if (
				typeof spacePanel[ prop ] === 'object' &&
				spacePanel[ prop ].units
			) {
				state[ prop ].units = Object.keys( spacePanel[ prop ].units );
				state[ prop ].unitRangeStep = {};
				state[ prop ].units.forEach( ( unit ) => {
					if (
						typeof spacePanel[ prop ].units[ unit ] === 'object'
					) {
						state[ prop ].unitRangeStep[ unit ] = {
							...spacePanel[ prop ].units[ unit ],
						};
					}
				} );
			}
		}
		return state;
	}, [ selectorSettings ] );

	return (
		<>
			{ fontSize && ( //icon size
				<>
					<NumberUnitProperty
						{ ...props }
						selector={ propSelector.fontSize }
						propName="fontSize"
					/>
					<Separator />
				</>
			) }
			{ margin && (
				<>
					<FourControls
						propName="margin"
						{ ...props }
						selector={ propSelector.margin }
					/>
					<Separator />
				</>
			) }
			{ padding && (
				<>
					<FourControls
						propName="padding"
						{ ...props }
						selector={ propSelector.padding }
					/>
					<Separator />
				</>
			) }
			{ width && (
				<>
					<NumberUnitProperty
						{ ...props }
						selector={ propSelector.width }
						propName="width"
						{ ...unitRangeStep.width }
					/>
					<Separator />
				</>
			) }
			{ minWidth && (
				<NumberUnitProperty
					{ ...props }
					selector={ propSelector.minWidth }
					propName="minWidth"
					{ ...unitRangeStep.minWidth }
				/>
			) }
			{ maxWidth && (
				<NumberUnitProperty
					{ ...props }
					selector={ propSelector.maxWidth }
					propName="maxWidth"
					{ ...unitRangeStep.maxWidth }
				/>
			) }
			{ height && (
				<NumberUnitProperty
					{ ...props }
					selector={ propSelector.height }
					propName="height"
					{ ...unitRangeStep.height }
				/>
			) }
			{ minHeight && (
				<NumberUnitProperty
					{ ...props }
					selector={ propSelector.minHeight }
					propName="minHeight"
					{ ...unitRangeStep.minHeight }
				/>
			) }
			{ maxHeight && (
				<NumberUnitProperty
					{ ...props }
					selector={ propSelector.maxHeight }
					propName="maxHeight"
					{ ...unitRangeStep.maxHeight }
				/>
			) }
		</>
	);
}
