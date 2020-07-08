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
	const { devices, selectorSettings } = props;
	const propSelector = useRelatedSelectorProps( selectorSettings, [
		'border',
	] );
	const currentSelector = isHover
		? propSelector.border + ':hover'
		: propSelector.border;
	const currentDevices = isHover ? ALL_DEVICES : devices;

	return (
		<ControlWrapper noHeader>
			<NormalHoverButtons
				isHover={ isHover }
				onChange={ ( value ) => setIsHover( value ) }
			/>
			<Border
				{ ...props }
				devices={ currentDevices }
				selector={ currentSelector }
				isHover={ isHover }
			/>
			<Separator />
			<FourControls
				propName="borderRadius"
				{ ...props }
				devices={ currentDevices }
				selector={ currentSelector }
				noSelectDevices={ isHover }
			/>
			<Separator />
			<BoxShadow
				{ ...props }
				devices={ currentDevices }
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
