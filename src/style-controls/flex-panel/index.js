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
			{ displayFlex && <DisplayFlex { ...props } /> }
			{ gap && <Gap { ...props } /> }
			{ flexDirection && <FlexDirection { ...props } /> }
			{ flexWrap && <FlexWrap { ...props } /> }
			{ justifyContent && <JustifyContent { ...props } /> }
			{ alignItems && <AlignItems { ...props } /> }
			{ alignContent && <AlignContent { ...props } /> }
			{ flex && <Flex { ...props } /> }
			{ alignSelf && <AlignSelf { ...props } /> }
			{ order && <Order { ...props } /> }
		</>
	);
}
