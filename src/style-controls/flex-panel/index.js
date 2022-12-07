/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
/**
 * Internal dependencies
 */
import usePanelActiveControl from '../use-panel-active-control';
import Order from '../order';
import FlexDirection from '../flex-direction';
import AlignItems from '../align-items';
import JustifyContent from '../justify-content';
import AlignSelf from '../align-self';
import AlignContent from '../align-content';
import FlexWrap from '../flex-wrap';
import Flex from '../flex';
import Gap from '../gap';
import Display from '../display';
import StyleControlsPanel from '../style-controls-panel';
import { getSelector } from '../utils';

const flexControls = [
	'order',
	'flexDirection',
	'flexWrap',
	'alignItems',
	'alignContent',
	'alignSelf',
	'justifyContent',
	'gap',
	'flex',
	'display',
];

export default function FlexPanel( props ) {
	const { selectorSettings } = props;
	const selector = getSelector( 'flex', selectorSettings );
	const {
		order,
		flexDirection,
		flexWrap,
		alignItems,
		alignContent,
		alignSelf,
		justifyContent,
		gap,
		flex,
		display,
	} = usePanelActiveControl( selectorSettings, flexControls, 'flex' );

	return (
		<StyleControlsPanel
			{ ...props }
			panelTitle={ __( 'Flex', 'scblocks' ) }
			panelName="flex"
		>
			{ display && (
				<Display { ...props } selector={ selector } type="flex" />
			) }
			{ flex && <Flex { ...props } selector={ selector } /> }
			{ gap && <Gap { ...props } selector={ selector } /> }
			{ flexDirection && (
				<FlexDirection { ...props } selector={ selector } />
			) }
			{ flexWrap && <FlexWrap { ...props } selector={ selector } /> }
			{ justifyContent && (
				<JustifyContent { ...props } selector={ selector } />
			) }
			{ alignItems && <AlignItems { ...props } selector={ selector } /> }
			{ alignContent && (
				<AlignContent { ...props } selector={ selector } />
			) }
			{ alignSelf && <AlignSelf { ...props } selector={ selector } /> }
			{ order && <Order { ...props } selector={ selector } /> }
		</StyleControlsPanel>
	);
}
