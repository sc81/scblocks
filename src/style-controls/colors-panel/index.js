/**
 * WordPress dependencies
 */
import { useState } from '@wordpress/element';
import { applyFilters } from '@wordpress/hooks';
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
import StyleControlsPanel from '../style-controls-panel';

export default function ColorsPanel( props ) {
	const { selectorSettings } = props;
	const [ isHover, setIsHover ] = useState( false );
	const colors = selectorSettings.panels.colors.controls;
	const hasHoverControls = selectorSettings.panels.colors.hasHoverControls;
	const controls = [];
	colors.forEach( ( control, index ) => {
		if ( ! isHover || ( isHover && control.hoverSelector ) ) {
			controls.push(
				<Color
					{ ...props }
					key={ index }
					label={ control.label }
					propName={ control.propName }
					selector={
						isHover ? control.hoverSelector : control.selector
					}
					devices={ isHover ? ALL_DEVICES : props.devices }
					isSelectDevice={ ! isHover }
				/>
			);
		}
	} );

	return (
		<StyleControlsPanel
			{ ...props }
			panelTitle={ __( 'Colors', 'scblocks' ) }
			panelName="colors"
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
		</StyleControlsPanel>
	);
}
