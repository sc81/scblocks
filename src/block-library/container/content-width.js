/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { SelectControl } from '@wordpress/components';
import { useMemo } from '@wordpress/element';
import { useSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import NumberUnit from '../../components/number-unit';
import propertyService from '../../style-controls/property-service';
import { CORE_BLOCK_EDITOR_STORE_NAME } from '../../constants';
import { BLOCK_SELECTOR } from '../../block/constants';
import Separator from '../../components/separator';

export default function ContentWidth( props ) {
	const { propValue, onChange } = propertyService( {
		...props,
		propName: 'maxWidth',
		selector: BLOCK_SELECTOR.container.content.alias,
	} );
	const themeWidth = useSelect( ( select ) => {
		return select( CORE_BLOCK_EDITOR_STORE_NAME ).getSettings().maxWidth;
	}, [] );
	const options = [
		{ label: __( 'Default', 'scblocks' ), value: '' },
		{ label: __( 'Theme Content Width' ), value: `${ themeWidth }px` },
		{ label: '600px', value: '600px' },
		{ label: '700px', value: '700px' },
		{ label: '800px', value: '800px' },
		{ label: '900px', value: '900px' },
		{ label: '1000px', value: '1000px' },
		{ label: '1100px', value: '1100px' },
		{ label: '1200px', value: '1200px' },
		{ label: '1300px', value: '1300px' },
		{ label: '1400px', value: '1400px' },
		{ label: __( 'Custom' ), value: 'custom' },
	];
	const selectWidth = useMemo( () => {
		const valueIndex = options.findIndex(
			( elm ) => elm.value === propValue
		);
		return valueIndex > -1 ? propValue : 'custom';
	}, [ propValue ] );

	function onChangeSelect( value ) {
		if ( value === 'custom' ) {
			value = propValue;
		}
		onChange( value );
	}

	return (
		<>
			<SelectControl
				label={ __( 'Select Content Width', 'scblocks' ) }
				value={ selectWidth }
				options={ options }
				onChange={ onChangeSelect }
			/>
			<NumberUnit
				label={ __( 'Content Width' ) }
				value={ propValue }
				onChange={ onChange }
				onClear={ () => onChange( '' ) }
				units={ [ 'px', '%', 'vw', 'vh' ] }
				displayClearButton
				unitRangeStep={ {
					px: {
						min: 50,
						max: 1600,
					},
					'%': {
						min: 10,
					},
				} }
			/>
			<Separator />
		</>
	);
}
