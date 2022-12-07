/**
 * WordPress dependencies
 */
import { useState } from '@wordpress/element';
import { applyFilters } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';
import { BaseControl } from '@wordpress/components';

/**
 * ScBlocks dependencies
 */
import { NormalHoverButtons } from '@scblocks/components';

/**
 * Internal dependencies
 */
import BoxShadow from '../box-shadow';
import BorderControl from '../border-control';
import BorderRadius from '../border-radius';
import StyleControlsPanel from '../style-controls-panel';
import { getHoverSelector, getSelector } from '../utils';

export default function BorderPanel( props ) {
	const { selectorSettings } = props;
	const [ isHover, setIsHover ] = useState( false );

	const selector = isHover
		? getHoverSelector( 'border', selectorSettings )
		: getSelector( 'border', selectorSettings );

	const hasHoverControls = selectorSettings.panels.border.hasHoverControls;

	return (
		<StyleControlsPanel
			{ ...props }
			panelTitle={ __( 'Border', 'scblocks' ) }
			panelName="border"
		>
			<BaseControl>
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
			</BaseControl>
		</StyleControlsPanel>
	);
}
