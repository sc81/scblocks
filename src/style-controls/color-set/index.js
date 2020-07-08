/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import Color from '../color';

const baseControls = [
	{
		label: __( 'Text color' ),
		propName: 'color',
	},
	{
		label: __( 'Background color' ),
		propName: 'backgroundColor',
	},
];

export default function ColorSet( props ) {
	const colors = props.colors || [];
	const controls = [ ...baseControls, ...colors ];

	return controls.map( ( control ) => (
		<Color
			{ ...props }
			key={ control.propName }
			label={ control.label }
			propName={ control.propName }
			selector={ props.selector }
		/>
	) );
}
