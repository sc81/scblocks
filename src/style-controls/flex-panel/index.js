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
import DisplayFlex from '../display-flex';

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
	'displayFlex',
];

export default function FlexPanel( props ) {
	const { selectorSettings } = props;
	const { selector } = selectorSettings.panels.flex;
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
		displayFlex,
	} = usePanelActiveControl( selectorSettings, flexControls, 'flex' );

	return (
		<>
			{ displayFlex && (
				<DisplayFlex { ...props } selector={ selector } />
			) }
			{ flex && <Flex { ...props } selector={ selector } /> }
			{ alignSelf && <AlignSelf { ...props } selector={ selector } /> }
			{ order && <Order { ...props } selector={ selector } /> }
			<div className="scblocks-flex-panel-items-heading">
				<span></span>
				<span>{ __( 'Items', 'scblocks' ) }</span>
				<span></span>
			</div>
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
		</>
	);
}
