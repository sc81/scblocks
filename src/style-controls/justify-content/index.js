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
			{ label: __( 'Default', 'scblocks' ), value: '' },
			{ label: __( 'Start', 'scblocks' ), value: 'flex-start' },
			{ label: __( 'Center', 'scblocks' ), value: 'center' },
			{ label: __( 'End', 'scblocks' ), value: 'flex-end' },
		];
		if ( extendedOptions ) {
			opt.push(
				...[
					{
						label: __( 'Space-between', 'scblocks' ),
						value: 'space-between',
					},
					{
						label: __( 'Space-around', 'scblocks' ),
						value: 'space-around',
					},
					{
						label: __( 'Space-evenly', 'scblocks' ),
						value: 'space-evenly',
					},
				]
			);
		}
		return opt;
	}, [ extendedOptions ] );

	return (
		<ControlWrapper
			label={ label || __( 'Horizontal position', 'scblocks' ) }
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
