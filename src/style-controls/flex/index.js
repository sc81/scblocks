/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import NumberProperty from '../number-property';
import AlignItems from '../align-items';
import JustifyContent from '../justify-content';
import usePanelActiveControl from '../../hooks/use-panel-active-control';
import useRelatedSelectorProps from '../../hooks/use-related-selector-props';
import { ALL_DEVICES } from '../../constants';
import FlexDirection from '../flex-direction';
import FlexBasis from '../flex-basis';

const flexProps = [
	'flexBasis',
	'flexGrow',
	'flexDirection',
	'alignItems',
	'justifyContent',
];

export default function Flex( props ) {
	const { selectorSettings } = props;
	const {
		flexBasis,
		flexGrow,
		flexDirection,
		alignItems,
		justifyContent,
	} = usePanelActiveControl( selectorSettings, flexProps, 'flex' );

	const propSelector = useRelatedSelectorProps( selectorSettings, flexProps );

	return (
		<>
			{ flexGrow && (
				<NumberProperty
					{ ...props }
					label={ __( 'Flex grow', 'scblocks' ) }
					propName="flexGrow"
					devices={ ALL_DEVICES }
					selector={ propSelector.flexGrow }
					max={ 30 }
				/>
			) }
			{ flexBasis && (
				<FlexBasis { ...props } selector={ propSelector.flexBasis } />
			) }
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
		</>
	);
}
