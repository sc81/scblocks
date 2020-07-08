/**
 * WordPress dependencies
 */
import { SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useMemo, useEffect } from '@wordpress/element';

/**
 * Internal dependencies
 */
import NumberUnit from '../../components/number-unit';
import OpenColorPicker from '../../components/open-color-picker';
import { PLUGIN_NAME } from '../../constants';
import { setPropValue, getPropValue } from '../../utils';
import { names } from './constants';
import { setCssMemoValue } from '../../hooks/use-block-memo';

const propName = names.image;

export default function Gradient( {
	attributes,
	devices,
	selector,
	setAttributes,
	blockMemo,
} ) {
	const gradient = getPropValue( {
		attributes,
		devices,
		selector,
		propName,
	} );
	const {
		type,
		firstColor,
		firstLocation,
		secondColor,
		secondLocation,
		posX,
		posY,
		angle,
	} = useMemo( () => {
		const state = {
			type: 'linear',
			firstColor: 'rgb(2,3,129)',
			secondColor: 'rgb(40,116,252)',
			firstLocation: '0%',
			secondLocation: '100%',
			angle: '0deg',
			posX: '50%',
			posY: '50%',
		};

		let value = gradient;

		function setColorLocation( val ) {
			let color;
			//first color and location
			color = val.match(
				/#(?:[0-9a-fA-F]{3}){1,2}|rgba?\(.+?\)|hsla?\(.+?\)/
			)[ 0 ];
			//replace color
			val = val.replace( color, '' ).trim();

			const location = val.substring( 0, val.indexOf( ',' ) );

			state.firstColor = color;
			state.firstLocation = location;
			//replace location
			val = val.substring( val.indexOf( ',' ) + 1 );

			//second color and location
			color = val.match(
				/#(?:[0-9a-fA-F]{3}){1,2}|rgba?\(.+?\)|hsla?\(.+?\)/
			)[ 0 ];
			//replace color
			val = val.replace( color, '' ).trim();

			state.secondColor = color;
			state.secondLocation = val;
		}

		if ( /^linear-gradient\(.+?\)/.test( value ) ) {
			value = value.replace( /^linear-gradient\(|\)$/g, '' );

			state.angle = value.substring( 0, value.indexOf( ',' ) );
			//replace angle
			value = value.substring( value.indexOf( ',' ) + 1 );

			setColorLocation( value );
		} else if ( /^radial-gradient\(.+?\)/.test( value ) ) {
			value = value.replace( /^radial-gradient\(|\)$/g, '' );

			//position
			let position = value.substring( 0, value.indexOf( ',' ) );
			position = position.split( ' ' );

			state.posX = position[ 1 ];
			state.posY = position[ 2 ];
			//replace position
			value = value.substring( value.indexOf( ',' ) + 1 );

			state.type = 'radial';

			setColorLocation( value );
		}
		return state;
	}, [ gradient ] );

	useEffect( () => {
		//not working
		if ( ! gradient ) {
			onChange( 'type', 'linear' );
		}
	}, [] );

	function onChange( name, val ) {
		const temp = {
			type,
			firstColor,
			firstLocation,
			secondColor,
			secondLocation,
			angle,
			posX,
			posY,
			[ name ]: val,
		};
		let value;
		if ( type === 'linear' ) {
			value = `linear-gradient(${ temp.angle },${ temp.firstColor } ${ temp.firstLocation },${ temp.secondColor } ${ temp.secondLocation })`;
		} else {
			value = `radial-gradient(at ${ temp.posX } ${ temp.posY },${ temp.firstColor } ${ temp.firstLocation },${ temp.secondColor } ${ temp.secondLocation })`;
		}
		setPropValue( {
			selector,
			devices,
			attributes,
			setAttributes,
			propName,
			value,
		} );
		setCssMemoValue( blockMemo, setPropValue, {
			selector,
			devices,
			propName: names.gradient,
			value,
		} );
	}

	return (
		<>
			<OpenColorPicker
				label={ __( 'Color' ) }
				value={ firstColor }
				onChange={ ( value ) => onChange( 'firstColor', value ) }
			/>
			<NumberUnit
				label={ __( 'Location' ) }
				value={ firstLocation }
				onChange={ ( value ) => onChange( 'firstLocation', value ) }
				min={ 0 }
				max={ 100 }
				units={ [ '%' ] }
			/>
			<OpenColorPicker
				label={ __( 'Second color' ) }
				value={ secondColor }
				onChange={ ( value ) => onChange( 'secondColor', value ) }
			/>
			<NumberUnit
				label={ __( 'Location' ) }
				value={ secondLocation }
				onChange={ ( value ) => onChange( 'secondLocation', value ) }
				min={ 0 }
				max={ 100 }
				units={ [ '%' ] }
			/>
			<SelectControl
				className={ `${ PLUGIN_NAME }-select-control` }
				label={ __( 'Type' ) }
				value={ type }
				options={ [
					{ label: __( 'Linear' ), value: 'linear' },
					{ label: __( 'Radial' ), value: 'radial' },
				] }
				onChange={ ( value ) => onChange( 'type', value ) }
			/>
			{ type === 'linear' && (
				<NumberUnit
					label={ __( 'Angle' ) }
					value={ angle }
					onChange={ ( value ) => onChange( 'angle', value ) }
					min={ 0 }
					max={ 360 }
					units={ [ 'deg' ] }
				/>
			) }
			{ type === 'radial' && (
				<NumberUnit
					label={ __( 'Horizontal' ) }
					value={ posX }
					onChange={ ( value ) => onChange( 'posX', value ) }
					min={ 0 }
					max={ 200 }
					units={ [ '%' ] }
				/>
			) }
			{ type === 'radial' && (
				<NumberUnit
					label={ __( 'Vertical' ) }
					value={ posY }
					onChange={ ( value ) => onChange( 'posY', value ) }
					min={ 0 }
					max={ 200 }
					units={ [ '%' ] }
				/>
			) }
		</>
	);
}
