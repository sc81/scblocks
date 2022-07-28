/**
 * WordPress dependencies
 */
import { useMemo } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { applyFilters } from '@wordpress/hooks';
import { PanelBody } from '@wordpress/components';

/**
 * Internal dependencies
 */
import usePanelActiveControl from '../use-panel-active-control';
import NumberUnitProperty from '../number-unit-property';
import FourControls from '../four-controls';
import { getControlSelector } from '../utils';
import NumberProperty from '../number-property';
import Gap from '../gap';
import Flex from '../flex';
import CombinedMaxWidth from '../combined-max-width';

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
	'flexGrow',
	'gap',
	'flex',
	'combinedMaxWidth',
];

export default function Space( props ) {
	const { selectorSettings, openedPanel, onClickPanel } = props;
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
		flexGrow,
		gap,
		flex,
		combinedMaxWidth,
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
	}, [ selectorSettings ] );

	const unitRangeStep = useMemo( () => {
		const state = {};
		const spacePanel = selectorSettings.panels.space;
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
		<PanelBody
			title={ __( 'Space', 'scblocks' ) }
			onToggle={ () => onClickPanel( 'space' ) }
			opened={ openedPanel === 'space' }
		>
			{ fontSize && ( //icon size
				<NumberUnitProperty
					{ ...props }
					selector={ propSelector.fontSize }
					propName="fontSize"
				/>
			) }
			{ gap && <Gap { ...props } selector={ propSelector.gap } /> }
			{ flex && <Flex { ...props } selector={ propSelector.flex } /> }
			{ combinedMaxWidth && <CombinedMaxWidth { ...props } /> }
			{ margin && (
				<FourControls
					propName="margin"
					{ ...props }
					selector={ propSelector.margin }
				/>
			) }
			{ padding && (
				<FourControls
					propName="padding"
					{ ...props }
					selector={ propSelector.padding }
				/>
			) }
			{ width && (
				<NumberUnitProperty
					{ ...props }
					selector={ propSelector.width }
					propName="width"
					{ ...unitRangeStep.width }
				/>
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
			{ flexGrow && (
				<NumberProperty
					{ ...props }
					selector={ propSelector.flexGrow }
					label={ __( 'Grab more space', 'scblocks' ) }
					propName="flexGrow"
					max={ 30 }
				/>
			) }
			{ applyFilters( 'scblocks.spacePanel.afterAll', null, props ) }
		</PanelBody>
	);
}
