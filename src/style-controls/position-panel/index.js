/**
 * WordPress dependencies
 */
import { useMemo } from '@wordpress/element';
import { applyFilters } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import usePanelActiveControl from '../use-panel-active-control';
import Zindex from '../z-index';
import Visibility from '../visibility';
import Order from '../order';
import FlexDirection from '../flex-direction';
import AlignItems from '../align-items';
import JustifyContent from '../justify-content';
import { getControlSelector, getSelector } from '../utils';
import JustifySelf from '../justify-self';
import JustifyItems from '../justify-items';
import AlignSelf from '../align-self';
import AlignContent from '../align-content';
import FlexWrap from '../flex-wrap';
import CombinedZindex from '../combined-z-index';
import StyleControlsPanel from '../style-controls-panel';

const positionProps = [
	'zIndex',
	'combinedZindex',
	'visibility',
	'order',
	'flexDirection',
	'flexWrap',
	'alignItems',
	'alignContent',
	'alignSelf',
	'justifyContent',
	'justifyItems',
	'justifySelf',
];

export default function PositionPanel( props ) {
	const { selectorSettings } = props;
	const selector = getSelector( 'position', selectorSettings );
	const {
		zIndex,
		combinedZindex,
		visibility,
		order,
		flexDirection,
		flexWrap,
		alignItems,
		alignContent,
		alignSelf,
		justifyContent,
		justifyItems,
		justifySelf,
	} = usePanelActiveControl( selectorSettings, positionProps, 'position' );

	const propSelector = useMemo( () => {
		const state = {};
		positionProps.forEach( ( prop ) => {
			state[ prop ] = getControlSelector(
				'position',
				prop,
				selectorSettings
			);
		} );
		return state;
	}, [ selectorSettings ] );

	return (
		<StyleControlsPanel
			{ ...props }
			panelTitle={ __( 'Position', 'scblocks' ) }
			panelName="position"
		>
			{ zIndex && (
				<Zindex { ...props } selector={ propSelector.zIndex } />
			) }
			{ combinedZindex && <CombinedZindex { ...props } /> }
			{ order && <Order { ...props } selector={ propSelector.order } /> }
			{ flexDirection && (
				<FlexDirection
					{ ...props }
					selector={ propSelector.flexDirection }
				/>
			) }
			{ flexWrap && (
				<FlexWrap { ...props } selector={ propSelector.flexWrap } />
			) }
			{ alignItems && (
				<AlignItems { ...props } selector={ propSelector.alignItems } />
			) }
			{ alignContent && (
				<AlignContent
					{ ...props }
					selector={ propSelector.alignContent }
				/>
			) }
			{ alignSelf && (
				<AlignSelf { ...props } selector={ propSelector.alignSelf } />
			) }
			{ justifyContent && (
				<JustifyContent
					{ ...props }
					selector={ propSelector.justifyContent }
				/>
			) }
			{ justifyItems && (
				<JustifyItems
					{ ...props }
					selector={ propSelector.justifyItems }
				/>
			) }
			{ justifySelf && (
				<JustifySelf
					{ ...props }
					selector={ propSelector.justifySelf }
				/>
			) }
			{ visibility && (
				<Visibility { ...props } selector={ propSelector.visibility } />
			) }
			{ applyFilters( 'scblocks.positionPanel.afterAll', null, {
				...props,
				selector,
			} ) }
		</StyleControlsPanel>
	);
}
