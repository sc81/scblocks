/**
 * WordPress dependencies
 */
import { useMemo } from '@wordpress/element';

/**
 * Internal dependencies
 */
import usePanelActiveControl from '../use-panel-active-control';
import Zindex from '../z-index';
import Visibility from '../visibility';
import Position from '../position';
import Order from '../order';
import FlexDirection from '../flex-direction';
import AlignItems from '../align-items';
import JustifyContent from '../justify-content';
import { getControlSelector } from '../utils';
import JustifySelf from '../justify-self';
import JustifyItems from '../justify-items';
import AlignSelf from '../align-self';
import AlignContent from '../align-content';
import FlexWrap from '../flex-wrap';

const positionProps = [
	'position',
	'zIndex',
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
	const {
		position,
		zIndex,
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
		<>
			{ position && (
				<Position { ...props } selector={ propSelector.position } />
			) }
			{ zIndex && (
				<Zindex { ...props } selector={ propSelector.zIndex } />
			) }
			{ order && <Order { ...props } selector={ propSelector.order } /> }
			{ flexDirection && (
				<FlexDirection
					{ ...props }
					selector={ propSelector.flexDirection }
				/>
			) }
			{ flexWrap && (
				<FlexWrap
					{ ...props }
					selector={ propSelector.flexWrap }
				/>
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
		</>
	);
}
