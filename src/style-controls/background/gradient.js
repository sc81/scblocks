/**
 * WordPress dependencies
 */
import {
	BaseControl,
	__experimentalGradientPicker as GradientPicker,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { CORE_BLOCK_EDITOR_STORE_NAME } from '../../constants';
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
	const gradients = useSelect(
		( select ) =>
			select( CORE_BLOCK_EDITOR_STORE_NAME ).getSettings().gradients
	);

	function onChange( value ) {
		if ( typeof value !== 'string' ) {
			value = '';
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
		<BaseControl>
			<BaseControl.VisualLabel>
				{ __( 'Gradient' ) }
			</BaseControl.VisualLabel>
			<GradientPicker
				gradients={ gradients }
				value={ gradient }
				onChange={ onChange }
			/>
		</BaseControl>
	);
}
