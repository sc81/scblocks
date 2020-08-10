/**
 * WordPress dependencies
 */
import { SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useMemo } from '@wordpress/element';
/**
 * Internal dependencies
 */
import NumberControl from '../../components/number-control';

export default function TransitionControl( {
	value,
	onChange,
	transitionProps,
} ) {
	const state = useMemo( () => {
		let duration = 0,
			timingFunction = '',
			delay = 0,
			remainder = '';
		if ( value ) {
			let extracted = '';
			const parts = value.split( ',' );
			parts.forEach( ( elm ) => {
				if (
					transitionProps.findIndex( ( prop ) =>
						elm.includes( prop )
					) > -1
				) {
					extracted = elm;
				} else {
					remainder += elm + ',';
				}
			} );
			if ( extracted ) {
				const extractedArr = extracted.split( ' ' );
				switch ( extractedArr.length ) {
					case 2:
						duration = parseFloat(
							extractedArr[ 1 ].replace( 's' )
						);
						break;
					case 3:
						duration = parseFloat(
							extractedArr[ 1 ].replace( 's' )
						);
						//when timing function is set to ease, the third part is delay
						if ( /\d/.test( extractedArr[ 2 ] ) ) {
							delay = parseFloat(
								extractedArr[ 2 ].replace( 's' )
							);
						} else {
							timingFunction = extractedArr[ 2 ];
						}
						break;
					case 4:
						duration = parseFloat(
							extractedArr[ 1 ].replace( 's' )
						);
						timingFunction = extractedArr[ 2 ];
						delay = parseFloat(
							extractedArr[ 3 ].replace( 's', '' )
						);
						break;
				}
			}
		}
		return {
			duration,
			timingFunction,
			delay,
			remainder: remainder.replace( /,$/, '' ),
		};
	}, [ value, transitionProps ] );
	function joinTransitionProps( parts ) {
		let val = '';
		transitionProps.forEach( ( prop ) => {
			val += `${ prop } ${ parts.duration }s${
				parts.timingFunction ? ' ' + parts.timingFunction : ''
			}${
				parts.delay && parseFloat( parts.delay ) > 0
					? ' ' + parts.delay + 's'
					: ''
			},`;
		} );
		return val.replace( /,$/, '' );
	}

	function onChangeValue( name, val ) {
		const next = {
			...state,
			[ name ]: val,
		};

		if ( next.duration && parseFloat( next.duration ) > 0 ) {
			val =
				joinTransitionProps( next ) +
				( next.remainder ? ',' + next.remainder : '' );
		} else {
			val = next.remainder;
		}
		onChange( val );
	}

	return (
		<>
			<NumberControl
				label={ __( 'Transition duration', 'scblocks' ) }
				value={ state.duration }
				onChange={ ( v ) => onChangeValue( 'duration', v ) }
				min={ 0 }
				max={ 3 }
				step={ 0.1 }
				withoutSelectDevices
			/>
			<NumberControl
				label={ __( 'Transition delay', 'scblocks' ) }
				value={ state.delay }
				onChange={ ( v ) => onChangeValue( 'delay', v ) }
				min={ 0 }
				max={ 3 }
				step={ 0.1 }
				withoutSelectDevices
			/>
			<SelectControl
				label={ __( 'Transition timing function', 'scblocks' ) }
				value={ state.timingFunction }
				options={ [
					{ label: 'ease', value: '' },
					{ label: 'ease-in', value: 'ease-in' },
					{ label: 'ease-out', value: 'ease-out' },
					{ label: 'ease-in-out', value: 'ease-in-out' },
					{ label: 'linear', value: 'linear' },
				] }
				onChange={ ( v ) => onChangeValue( 'timingFunction', v ) }
			/>
		</>
	);
}
