/**
 * WordPress dependencies
 */
import { SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useMemo } from '@wordpress/element';

/**
 * Internal dependencies
 */
import propertyService from '../property-service';
import ControlWrapper from '../../components/control-wrapper';

const propName = 'justifyContent';

export default function JustifyContent( props ) {
	const { label, extendedOptions, displayInline } = props;
	const { propValue, onChange } = propertyService( {
		...props,
		propName,
	} );
	const options = useMemo( () => {
		const opt = [
			{ label: __( 'Default' ), value: '' },
			{ label: __( 'Start' ), value: 'flex-start' },
			{ label: __( 'Center' ), value: 'center' },
			{ label: __( 'End' ), value: 'flex-end' },
		];
		if ( extendedOptions ) {
			opt.push(
				...[
					{ label: __( 'Space-between' ), value: 'space-between' },
					{ label: __( 'Space-around' ), value: 'space-around' },
					{ label: __( 'Space-evenly' ), value: 'space-evenly' },
				]
			);
		}
		return opt;
	}, [ extendedOptions ] );

	return (
		<ControlWrapper
			label={ label || __( 'Horizontal position' ) }
			displayInline={ displayInline }
		>
			<SelectControl
				value={ propValue }
				options={ options }
				onChange={ onChange }
			/>
		</ControlWrapper>
	);
}
