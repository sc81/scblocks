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
		label: __( 'Text color', 'scblocks' ),
		propName: 'color',
	},
	{
		label: __( 'Background color', 'scblocks' ),
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
