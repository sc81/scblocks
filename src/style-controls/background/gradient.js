/**
 * WordPress dependencies
 */
import { GradientPicker } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';

/**
 * ScBlocks dependencies
 */
import { setPropValue, getPropValue } from '@scblocks/css-utils';
import { CORE_BLOCK_EDITOR_STORE_NAME } from '@scblocks/constants';
import { ControlWrapper } from '@scblocks/components';

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
	showSelectDevice,
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
	}

	return (
		<ControlWrapper
			label={ __( 'Gradient', 'scblocks' ) }
			isSelectDevices={ ! showSelectDevice }
			isIndicator={ !! gradient }
		>
			<GradientPicker
				gradients={ gradients }
				value={ gradient }
				onChange={ onChange }
			/>
		</ControlWrapper>
	);
}
