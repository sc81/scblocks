/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import Color from '../color';
import { ALL_DEVICES } from '../../constants';

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
		alias: 'linkColor',
		label: __( 'Link Color', 'scblocks' ),
		propName: 'color',
	},
	{
		alias: 'linkColorHover',
		label: __( 'Link Color Hover', 'scblocks' ),
		propName: 'color',
	},
	{
		alias: 'highlightText',
		label: __( 'Highlight Text', 'scblocks' ),
		propName: 'color',
	},
];

export default function ColorSet( props ) {
	const colors = props.selectorSettings.allowedPanels.colors;

	return controls.map( ( control ) => {
		if ( ! colors[ control.alias ] ) {
			return null;
		}
		return (
			<Color
				{ ...props }
				devices={ ALL_DEVICES }
				key={ control.alias }
				label={ control.label }
				propName={ control.propName }
				selector={ colors[ control.alias ].selector }
			/>
		);
	} );
}
