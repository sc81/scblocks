/**
 * WordPress dependencies
 */
import { useState } from '@wordpress/element';
import { applyFilters } from '@wordpress/hooks';

/**
 * ScBlocks dependencies
 */
import { ControlWrapper, NormalHoverButtons } from '@scblocks/components';

/**
 * Internal dependencies
 */
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

	const hasHoverControls = selectorSettings.panels?.border.hasHoverControls;

	return (
		<ControlWrapper withoutHeader>
			{ hasHoverControls && (
				<NormalHoverButtons
					isHover={ isHover }
					onChange={ ( value ) => setIsHover( value ) }
				/>
			) }
			<BorderControl { ...props } selector={ selector } />
			{ isHover &&
				applyFilters(
					'scblocks.border.transitionControl',
					null,
					props
				) }
			<BorderRadius { ...props } selector={ selector } />
			{ isHover &&
				applyFilters(
					'scblocks.borderRadius.transitionControl',
					null,
					props
				) }
			<BoxShadow { ...props } selector={ selector } />
			{ isHover &&
				applyFilters(
					'scblocks.boxShadow.transitionControl',
					null,
					props
				) }
		</ControlWrapper>
	);
}
