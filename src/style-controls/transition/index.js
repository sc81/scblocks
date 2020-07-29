/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useMemo } from '@wordpress/element';

/**
 * Internal dependencies
 */
import TransitionControl from '../transition-control';
import { ALL_DEVICES } from '../../constants';
import ControlWrapper from '../../components/control-wrapper';
import propertyService from '../property-service';

const propName = 'transition';

export default function Transition( props ) {
	const { propValue, onChange } = propertyService( {
		...props,
		propName,
		devices: ALL_DEVICES,
	} );
	const { transitionProps } = props;
	const isValue = useMemo( () => {
		return (
			transitionProps.findIndex( ( prop ) =>
				propValue.includes( prop )
			) > -1
		);
	}, [ propValue, transitionProps ] );

	function onClear() {
		const splittedValue = propValue.split( ',' );
		const nextValue = splittedValue.filter( ( part ) => {
			return (
				transitionProps.findIndex( ( prop ) => part.includes( prop ) ) <
				0
			);
		} );
		onChange( nextValue.join( ',' ) );
	}

	return (
		<ControlWrapper
			label={ __( 'Transition' ) }
			displayClearButton={ isValue }
			onClear={ onClear }
			withoutSelectDevices
		>
			<TransitionControl
				value={ propValue }
				onChange={ onChange }
				transitionProps={ transitionProps }
			/>
		</ControlWrapper>
	);
}
