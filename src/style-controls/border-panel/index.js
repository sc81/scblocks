/**
 * WordPress dependencies
 */
import { useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { ALL_DEVICES } from '../../constants';
import Border from '../border';
import Transition from '../transition';
import BoxShadow from '../box-shadow';
import NormalHoverButtons from '../../components/normal-hover-buttons/index';
import FourControls from '../four-controls';
import ControlWrapper from '../../components/control-wrapper';
import Separator from '../../components/separator';
import useRelatedSelectorProps from '../../hooks/use-related-selector-props';

export default function BorderPanel( props ) {
	const [ isHover, setIsHover ] = useState( false );
	const propSelector = useRelatedSelectorProps( props.selectorSettings, [
		'border',
	] );
	const currentSelector = isHover
		? propSelector.border + ':hover'
		: propSelector.border;

	return (
		<ControlWrapper withoutHeader>
			<NormalHoverButtons
				isHover={ isHover }
				onChange={ ( value ) => setIsHover( value ) }
			/>
			<Border
				{ ...props }
				devices={ ALL_DEVICES }
				selector={ currentSelector }
				isHover={ isHover }
			/>
			<Separator />
			<FourControls
				propName="borderRadius"
				{ ...props }
				devices={ ALL_DEVICES }
				selector={ currentSelector }
				withoutSelectDevices
			/>
			<Separator />
			<BoxShadow
				{ ...props }
				devices={ ALL_DEVICES }
				selector={ currentSelector }
				isHover={ isHover }
			/>
			{ isHover && (
				<>
					<Separator />
					<Transition
						{ ...props }
						devices={ ALL_DEVICES }
						transitionProps={ [
							'border',
							'border-radius',
							'box-shadow',
						] }
					/>
				</>
			) }
		</ControlWrapper>
	);
}
