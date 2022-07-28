/**
 * WordPress dependencies
 */
import { useState } from '@wordpress/element';
import { applyFilters } from '@wordpress/hooks';
import { PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

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

export default function ColorsPanel( props ) {
	const { selectorSettings, openedPanel, onClickPanel } = props;
	const [ isHover, setIsHover ] = useState( false );
	const colors = selectorSettings.panels.colors;
	const hasHoverControls = getHasHoverControls( colors );
	const controls = [];
	colors.forEach( ( control, index ) => {
		if ( ! isHover || ( isHover && control.hoverSelector ) ) {
			controls.push(
				<Color
					{ ...props }
					devices={ ALL_DEVICES }
					key={ index }
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
		<PanelBody
			title={ __( 'Colors', 'scblocks' ) }
			onToggle={ () => onClickPanel( 'colors' ) }
			opened={ openedPanel === 'colors' }
		>
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
		</PanelBody>
	);
}
