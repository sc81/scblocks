/**
 * WordPress dependencies
 */
import { useState } from '@wordpress/element';
import { applyFilters } from '@wordpress/hooks';

/**
 * ScBlocks dependencies
 */
import { ALL_DEVICES } from '@scblocks/constants';
import { NormalHoverButtons } from '@scblocks/components';

/**
 * Internal dependencies
 */
import Color from '../color';

function getHasHoverControls( colors ) {
	return colors.findIndex( ( elm ) => !! elm.hoverSelector ) > -1;
}

export default function ColorSet( props ) {
	const { selectorSettings } = props;
	const [ isHover, setIsHover ] = useState( false );
	const colors = selectorSettings.panels.colors;
	const hasHoverControls = getHasHoverControls( colors );
	const controls = [];
	colors.forEach( ( control ) => {
		if ( ! isHover || ( isHover && control.hoverSelector ) ) {
			controls.push(
				<Color
					{ ...props }
					devices={ ALL_DEVICES }
					key={ control.propName }
					label={ control.label }
					propName={ control.propName }
					selector={
						isHover ? control.hoverSelector : control.selector
					}
				/>
			);
		}
	} );

	return (
		<>
			{ hasHoverControls && (
				<NormalHoverButtons
					isHover={ isHover }
					onChange={ ( value ) => setIsHover( value ) }
				/>
			) }
			{ controls }
			{ isHover &&
				applyFilters(
					'scblocks.colorsPanel.hoverControlsPanel',
					null,
					props
				) }
		</>
	);
}
