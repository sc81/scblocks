/**
 * WordPress dependencies
 */
import { useMemo } from '@wordpress/element';

/**
 * Internal dependencies
 */
import useRelatedSelectorProps from '../../hooks/use-related-selector-props';
import usePanelActiveControl from '../../hooks/use-panel-active-control';
import NumberUnitProperty from '../number-unit-property';
import FourControls from '../four-controls';
import Separator from '../../components/separator';

const spaceProps = [
	'margin',
	'padding',
	'width',
	'minWidth',
	'maxWidth',
	'height',
	'minHeight',
	'maxHeight',
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
	} = usePanelActiveControl( selectorSettings, spaceProps, 'space' );

	const propSelector = useRelatedSelectorProps(
		selectorSettings,
		spaceProps
	);

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
