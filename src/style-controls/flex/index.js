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

	return (
		<>
			{ flexGrow && (
				<NumberProperty
					{ ...props }
					label={ __( 'Flex grow', 'scblocks' ) }
					propName="flexGrow"
					max={ 30 }
				/>
			) }
			{ flexBasis && <FlexBasis { ...props } /> }
			{ flexDirection && <FlexDirection { ...props } /> }
			{ alignItems && <AlignItems { ...props } /> }
			{ justifyContent && <JustifyContent { ...props } /> }
		</>
	);
}
