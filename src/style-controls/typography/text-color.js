/**
 * WordPress dependencies
 */
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import NormalHoverButtons from '../../components/normal-hover-buttons';
import OpenColorPicker from '../../components/open-color-picker';
import propertyService from '../property-service';
import { ALL_DEVICES } from '../../constants';
import Separator from '../../components/separator';
import Transition from '../transition';

export default function TextColor( props ) {
	const { selector, attributes, setAttributes } = props;
	const [ isHover, setIsHover ] = useState( false );

	const currentSelector = isHover ? `${ selector }:hover` : selector;

	const { propValue: color, onChange } = propertyService( {
		propName: 'color',
		selector: currentSelector,
		devices: ALL_DEVICES,
		attributes,
		setAttributes,
	} );
	return (
		<>
			<div>
				<NormalHoverButtons
					isHover={ isHover }
					onChange={ ( value ) => setIsHover( value ) }
				/>
			</div>
			<OpenColorPicker
				lable={ __( 'Text color' ) }
				value={ color }
				onChange={ onChange }
			/>
			{ isHover && (
				<>
					<Separator />
					<Transition { ...props } transitionProps={ [ 'color' ] } />
				</>
			) }
			<Separator />
		</>
	);
}
