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
import { getControlSelector, getControlHoverSelector } from '../utils';

export default function BorderPanel( props ) {
	const { selectorSettings } = props;
	const [ isHover, setIsHover ] = useState( false );

	const selector = isHover
		? getControlHoverSelector( 'border', 'border', selectorSettings )
		: getControlSelector( 'border', 'border', selectorSettings );

	const hasHoverControls =
		selectorSettings.allowedPanels?.border.hasHoverControls;

	return (
		<ControlWrapper withoutHeader>
			{ hasHoverControls && (
				<NormalHoverButtons
					isHover={ isHover }
					onChange={ ( value ) => setIsHover( value ) }
				/>
			) }
			<Border { ...props } selector={ selector } isHover={ isHover } />
			<Separator />
			<FourControls
				propName="borderRadius"
				{ ...props }
				devices={ ALL_DEVICES }
				selector={ selector }
				withoutSelectDevices
			/>
			<Separator />
			<BoxShadow
				{ ...props }
				devices={ ALL_DEVICES }
				selector={ selector }
				isHover={ isHover }
			/>
			{ isHover && (
				<>
					<Separator />
					<Transition
						{ ...props }
						devices={ ALL_DEVICES }
						selector={ selector }
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
