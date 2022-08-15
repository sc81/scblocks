import { TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import { ControlWrapper } from '@scblocks/components';
import { getPropertiesValue, setPropsValue } from '@scblocks/css-utils';

export default function Flex( {
	attributes,
	devices,
	selector,
	setAttributes,
} ) {
	const { flexGrow, flexShrink, flexBasis } = getPropertiesValue( {
		attributes,
		devices,
		selector,
		props: [ 'flexGrow', 'flexShrink', 'flexBasis' ],
	} );
	function onChange( name, value ) {
		setValues( {
			flexBasis,
			flexGrow,
			flexShrink,
			[ name ]: value,
		} );
	}
	function onClear() {
		setValues( {
			flexBasis: '',
			flexGrow: '',
			flexShrink: '',
		} );
	}
	function setValues( values ) {
		setPropsValue( {
			attributes,
			devices,
			selector,
			setAttributes,
			props: values,
		} );
	}
	return (
		<ControlWrapper
			label={ __( 'Flex', 'scblocks' ) }
			isClearButton={ flexBasis || flexGrow || flexShrink }
			isIndicator={ flexBasis || flexGrow || flexShrink }
			onClear={ onClear }
			noMarginBottom
		>
			<div className="scblocks-flex-controls">
				<TextControl
					className="scblocks-flex-controls-grow"
					label={ __( 'Grow', 'scblocks' ) }
					value={ flexGrow }
					onChange={ ( value ) => onChange( 'flexGrow', value ) }
					min={ 0 }
					type="number"
					autoComplete="off"
				/>
				<TextControl
					className="scblocks-flex-controls-shrink"
					label={ __( 'Shrink', 'scblocks' ) }
					value={ flexShrink }
					onChange={ ( value ) => onChange( 'flexShrink', value ) }
					min={ 0 }
					type="number"
					autoComplete="off"
				/>
				<TextControl
					className="scblocks-flex-controls-basis"
					label={ __( 'Basis', 'scblocks' ) }
					value={ flexBasis }
					onChange={ ( value ) => onChange( 'flexBasis', value ) }
					autoComplete="off"
				/>
			</div>
		</ControlWrapper>
	);
}
