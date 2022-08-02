import { __ } from '@wordpress/i18n';

import { ControlWrapper, NumberUnit } from '@scblocks/components';
import { getPropertiesValue, setPropsValue } from '@scblocks/css-utils';

export default function Gap( {
	attributes,
	devices,
	selector,
	setAttributes,
} ) {
	const { columnGap, rowGap } = getPropertiesValue( {
		attributes,
		devices,
		selector,
		props: [ 'columnGap', 'rowGap' ],
	} );

	function onChange( name, value ) {
		setValues( {
			columnGap,
			rowGap,
			[ name ]: value,
		} );
	}
	function onClear() {
		setValues( {
			columnGap: '',
			rowGap: '',
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
			label={ __( 'Gap', 'scblocks' ) }
			onClear={ onClear }
			isClearButton={ columnGap || rowGap }
		>
			<div className="scblocks-gap-controls">
				<div className="scblocks-gap-controls-column">
					<NumberUnit
						label={ __( 'Column', 'scblocks' ) }
						value={ columnGap }
						units={ [ 'px', '%', 'em', 'rem' ] }
						isSelectDevice={ false }
						onChange={ ( value ) => onChange( 'columnGap', value ) }
						noMarginBottom
						isSlider={ false }
					/>
				</div>
				<div className="scblocks-gap-controls-row">
					<NumberUnit
						label={ __( 'Row', 'scblocks' ) }
						value={ rowGap }
						units={ [ 'px', '%', 'em', 'rem' ] }
						isSelectDevice={ false }
						onClear={ onClear }
						onChange={ ( value ) => onChange( 'rowGap', value ) }
						noMarginBottom
						isSlider={ false }
					/>
				</div>
			</div>
		</ControlWrapper>
	);
}
