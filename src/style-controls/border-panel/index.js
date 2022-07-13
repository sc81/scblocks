/**
 * WordPress dependencies
 */
import { useState } from '@wordpress/element';

/**
 * ScBlocks dependencies
 */
import { ALL_DEVICES } from '@scblocks/constants';
import { ControlWrapper, NormalHoverButtons } from '@scblocks/components';

/**
 * Internal dependencies
 */
import Transition from '../transition';
import BoxShadow from '../box-shadow';
import { getControlSelector, getControlHoverSelector } from '../utils';
import BorderControl from '../border-control';
import BorderRadius from '../border-radius';

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
			<BorderControl { ...props } selector={ selector } />
			<BorderRadius { ...props } selector={ selector } />
			<BoxShadow
				{ ...props }
				devices={ ALL_DEVICES }
				selector={ selector }
				isHover={ isHover }
			/>
			{ isHover && (
				<>
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
