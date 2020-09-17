/**
 * WordPress dependencies
 */
import { useMemo } from '@wordpress/element';

/**
 * Internal dependencies
 */
import usePanelActiveControl from '../../hooks/use-panel-active-control';
import Zindex from '../z-index';
import Visibility from '../visibility';
import Position from '../position';
import Order from '../order';
import FlexDirection from '../flex-direction';
import AlignItems from '../align-items';
import JustifyContent from '../justify-content';
import { getControlSelector } from '../utils';

const positionProps = [
	'position',
	'zIndex',
	'visibility',
	'order',
	'flexDirection',
	'alignItems',
	'justifyContent',
];

export default function PositionPanel( props ) {
	const { selectorSettings } = props;
	const {
		position,
		zIndex,
		visibility,
		order,
		flexDirection,
		alignItems,
		justifyContent,
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
			{ alignItems && (
				<AlignItems { ...props } selector={ propSelector.alignItems } />
			) }
			{ justifyContent && (
				<JustifyContent
					{ ...props }
					selector={ propSelector.justifyContent }
				/>
			) }
			{ visibility && (
				<Visibility { ...props } selector={ propSelector.visibility } />
			) }
		</>
	);
}
