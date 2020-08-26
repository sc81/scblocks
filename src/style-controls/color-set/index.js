/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import Color from '../color';
import { ALL_DEVICES } from '../../constants';
import NormalHoverButtons from '../../components/normal-hover-buttons';

const controls = [
	{
		alias: 'textColor',
		label: __( 'Text Color', 'scblocks' ),
		propName: 'color',
	},
	{
		alias: 'backgroundColor',
		label: __( 'Background Color', 'scblocks' ),
		propName: 'backgroundColor',
	},
	{
		alias: 'borderColor',
		label: __( 'Border Color', 'scblocks' ),
		propName: 'borderColor',
	},
	{
		alias: 'linkColor',
		label: __( 'Link Color', 'scblocks' ),
		propName: 'color',
	},
	{
		alias: 'highlightText',
		label: __( 'Highlight Text', 'scblocks' ),
		propName: 'color',
	},
];

export default function ColorSet( props ) {
	const { selectorSettings } = props;
	const [ isHover, setIsHover ] = useState( false );
	const colors = selectorSettings.allowedPanels.colors;
	const { selector, hoverSelector } = selectorSettings;
	const colorControls = [];
	const hoverControls = [];

	controls.forEach( ( control ) => {
		if ( ! colors[ control.alias ] ) {
			return null;
		}
		const controlSelector = colors[ control.alias ].selector;
		colorControls.push(
			<Color
				{ ...props }
				devices={ ALL_DEVICES }
				key={ control.alias }
				label={ control.label }
				propName={ control.propName }
				selector={
					( typeof controlSelector === 'string' &&
						controlSelector ) ||
					selector
				}
			/>
		);
		if ( colors[ control.alias ].hasHoverControls ) {
			hoverControls.push(
				<Color
					{ ...props }
					devices={ ALL_DEVICES }
					key={ control.alias }
					label={ control.label }
					propName={ control.propName }
					selector={
						colors[ control.alias ].hoverSelector || hoverSelector
					}
				/>
			);
		}
	} );
	return (
		<>
			{ hoverControls.length > 0 && (
				<NormalHoverButtons
					isHover={ isHover }
					onChange={ ( value ) => setIsHover( value ) }
				/>
			) }
			{ ! isHover && colorControls }
			{ isHover && hoverControls }
		</>
	);
}
