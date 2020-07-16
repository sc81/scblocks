/**
 * WordPress dependencies
 */
import { ToggleControl, SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { ALL_DEVICES, TABLET_DEVICES, MOBILE_DEVICES } from '../../constants';
import NumberUnit from '../../components/number-unit';
import OpenColorPicker from '../../components/open-color-picker';
import {
	setPropValue,
	getPropertiesValue,
	setPropsAndSettings,
	setPropsSettingsForVariousMedia,
	setSelectorsPropsSettingsForVariousMedia,
} from '../../utils';
import shapes from './shapes';

const names = {
	width: 'width',
	height: 'height',
	fill: 'fill',
	zIndex: 'zIndex',
	transform: 'transform',
};

export function Divider( {
	attributes,
	setAttributes,
	devices,
	selector,
	isTop,
} ) {
	const svgSelector = selector + ' svg';
	const { shapeTopName, shapeBottomName } = attributes;
	const shapeName = isTop ? shapeTopName : shapeBottomName;

	let { isNegativeTop, isNegativeBottom } = attributes;
	isNegativeTop = isNegativeTop === 'true' ? true : false;
	isNegativeBottom = isNegativeBottom === 'true' ? true : false;

	const { fill, transform: flip } = getPropertiesValue( {
		attributes,
		devices: ALL_DEVICES,
		selector: svgSelector,
		props: [ names.fill, names.transform ],
	} );
	const { zIndex } = getPropertiesValue( {
		attributes,
		devices: ALL_DEVICES,
		selector,
		props: [ names.transform, names.zIndex ],
	} );
	const { width, height } = getPropertiesValue( {
		attributes,
		devices,
		selector: svgSelector,
		props: [ names.width, names.height ],
	} );

	function onChangeSvgProps( propName, value ) {
		setPropValue( {
			attributes,
			setAttributes,
			selector: svgSelector,
			devices: propName === names.fill ? ALL_DEVICES : devices,
			propName,
			value,
		} );
	}
	function onChangeFlip( value ) {
		value = value ? 'rotateY(180deg)' : '';
		setPropValue( {
			attributes,
			setAttributes,
			selector: svgSelector,
			devices: ALL_DEVICES,
			propName: 'transform',
			value,
		} );
	}
	function onChangeZindex( index ) {
		index = index ? '2' : '';
		const pointerEvents = index ? 'none' : '';
		setPropsAndSettings( {
			attributes,
			setAttributes,
			selector,
			devices: ALL_DEVICES,
			props: {
				zIndex: index,
				pointerEvents,
			},
		} );
	}
	function onChangeInvert( value ) {
		const shapeSvg = value
			? shapes[ shapeName ].negative
			: shapes[ shapeName ].svg;
		if ( isTop ) {
			setAttributes( {
				shapeTop: shapeSvg,
				isNegativeTop: value ? 'true' : 'false',
			} );
		} else {
			setAttributes( {
				shapeBottom: shapeSvg,
				isNegativeBottom: value ? 'true' : 'false',
			} );
		}
	}
	function onChangeType( value ) {
		if ( ! value ) {
			setSelectorsPropsSettingsForVariousMedia( {
				selector: svgSelector,
				attributes,
				setAttributes,
				mediaProps: {
					[ ALL_DEVICES ]: {
						[ selector ]: {
							zIndex: '',
						},
						[ svgSelector ]: {
							fill: '',
							transform: '',
							width: '',
							height: '',
						},
					},
					[ TABLET_DEVICES ]: {
						[ svgSelector ]: { width: '', height: '' },
					},
					[ MOBILE_DEVICES ]: {
						[ svgSelector ]: { height: '', width: '' },
					},
				},
			} );
			if ( isTop ) {
				setAttributes( { shapeTopName: '', shapeTop: '' } );
			} else {
				setAttributes( { shapeBottomName: '', shapeBottom: '' } );
			}
		} else {
			if ( isTop ) {
				const shapeSvg = isNegativeTop
					? shapes[ value ].negative
					: shapes[ value ].svg;
				setAttributes( { shapeTop: shapeSvg, shapeTopName: value } );
			} else {
				const shapeSvg = isNegativeBottom
					? shapes[ value ].negative
					: shapes[ value ].svg;
				setAttributes( {
					shapeBottom: shapeSvg,
					shapeBottomName: value,
				} );
			}
			clearPropsIfAny( value );
		}
	}
	function clearPropsIfAny( type ) {
		const { width: isWidth, flip: isFlip } = shapes[ type ].controls;
		if ( ! isFlip || ! isWidth ) {
			const props = {};
			if ( ! isFlip ) {
				props.transform = '';
			}
			if ( ! isWidth ) {
				props.width = '';
			}
			setPropsSettingsForVariousMedia( {
				selector: svgSelector,
				attributes,
				setAttributes,
				mediaProps: {
					[ ALL_DEVICES ]: props,
					[ TABLET_DEVICES ]: props,
					[ MOBILE_DEVICES ]: props,
				},
			} );
		}
	}

	return (
		<>
			<SelectControl
				label={ __( 'Type' ) }
				value={ shapeName }
				options={ [
					{ label: 'None', value: '' },
					{ label: 'Arrow', value: 'arrow' },
					{ label: 'Book', value: 'book' },
					{ label: 'Curve asymmetrical', value: 'curveAsymmetrical' },
					{ label: 'Curve', value: 'curve' },
					{ label: 'Pyramids', value: 'pyramids' },
					{ label: 'Tilt', value: 'tilt' },
					{
						label: 'Triangle asymmetrical',
						value: 'triangleAsymmetrical',
					},
					{ label: 'Triangle', value: 'triangle' },
					{ label: 'Waves', value: 'waves' },
					{ label: 'Waves 2', value: 'waves2' },
				] }
				onChange={ onChangeType }
			/>
			{ shapeName && (
				<>
					<OpenColorPicker
						label={ __( 'Color' ) }
						value={ fill }
						onChange={ ( value ) =>
							onChangeSvgProps( names.fill, value )
						}
					/>
					{ shapes[ shapeName ].controls.width && (
						<NumberUnit
							label={ __( 'Width' ) }
							value={ width }
							units={ [ '%' ] }
							onChange={ ( value ) =>
								onChangeSvgProps( names.width, value )
							}
							unitRangeStep={ {
								'%': {
									min: 100,
									max: 300,
								},
							} }
							initialPosition={ 100 }
						/>
					) }
					<NumberUnit
						label={ __( 'Height' ) }
						value={ height }
						units={ [ 'px' ] }
						onChange={ ( value ) =>
							onChangeSvgProps( names.height, value )
						}
						unitRangeStep={ {
							px: {
								max: 500,
							},
						} }
						initialPosition={ 50 }
					/>
					{ shapes[ shapeName ].controls.flip && (
						<ToggleControl
							label={ __( 'Flip' ) }
							checked={ !! flip }
							onChange={ onChangeFlip }
						/>
					) }
					{ shapes[ shapeName ].controls.invert && (
						<ToggleControl
							label={ __( 'Invert' ) }
							checked={ isTop ? isNegativeTop : isNegativeBottom }
							onChange={ onChangeInvert }
						/>
					) }
					<ToggleControl
						label={ __( 'Bring to front' ) }
						checked={ !! zIndex }
						onChange={ onChangeZindex }
					/>
				</>
			) }
		</>
	);
}
