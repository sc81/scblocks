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
 * ScBlocks dependencies
 */
import {
	setPropValue,
	getPropValue,
	setCssMemoValue,
} from '@scblocks/css-utils';
import { CORE_BLOCK_EDITOR_STORE_NAME } from '@scblocks/constants';

/**
 * Internal dependencies
 */
import { names } from './constants';

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
			propName,
			value,
		} );
	}

	return (
		<BaseControl>
			<BaseControl.VisualLabel>
				{ __( 'Gradient', 'scblocks' ) }
			</BaseControl.VisualLabel>
			<GradientPicker
				gradients={ gradients }
				value={ gradient }
				onChange={ onChange }
			/>
		</BaseControl>
	);
}
