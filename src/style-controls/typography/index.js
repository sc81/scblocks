import TextTransform from './text-transform';
import FontWeight from './font-weight';
import FontFamily from './font-family';
import FontStyle from './font-style';
import TextDecoration from './text-decoration';
import FontSize from './font-size';
import LineHeight from './line-height';
import LetterSpacing from './letter-spacing';
import { setPropValue, getPropertiesValue } from '../../utils';
import { ALL_DEVICES } from '../../constants';
import useRelatedSelectorProps from '../../hooks/use-related-selector-props';
import TextColor from './text-color';

export default function Typography( props ) {
	const { devices, attributes, setAttributes, selectorSettings } = props;
	const propSelector = useRelatedSelectorProps( selectorSettings, [
		'typography',
	] );

	function onChange( obj ) {
		setPropValue( {
			selector: propSelector.typography,
			attributes,
			setAttributes,
			...obj,
		} );
	}

	const {
		fontFamily,
		textTransform,
		fontWeight,
		textDecoration,
		fontStyle,
	} = getPropertiesValue( {
		attributes,
		devices: ALL_DEVICES,
		selector: propSelector.typography,
		props: [
			'fontFamily',
			'textTransform',
			'fontWeight',
			'textDecoration',
			'fontStyle',
		],
	} );
	const { fontSize, lineHeight, letterSpacing } = getPropertiesValue( {
		attributes,
		devices,
		selector: propSelector.typography,
		props: [ 'fontSize', 'lineHeight', 'letterSpacing' ],
	} );

	return (
		<>
			<TextColor { ...props } />
			<FontFamily
				value={ fontFamily }
				onChange={ ( value ) =>
					onChange( {
						value,
						propName: 'fontFamily',
						devices: ALL_DEVICES,
					} )
				}
			/>
			<TextTransform
				value={ textTransform }
				onChange={ ( value ) =>
					onChange( {
						value,
						propName: 'textTransform',
						devices: ALL_DEVICES,
					} )
				}
			/>
			<FontWeight
				value={ fontWeight }
				onChange={ ( value ) =>
					onChange( {
						value,
						propName: 'fontWeight',
						devices: ALL_DEVICES,
					} )
				}
			/>
			<TextDecoration
				value={ textDecoration }
				onChange={ ( value ) =>
					onChange( {
						value,
						propName: 'textDecoration',
						devices: ALL_DEVICES,
					} )
				}
			/>
			<FontStyle
				value={ fontStyle }
				onChange={ ( value ) =>
					onChange( {
						value,
						propName: 'fontStyle',
						devices: ALL_DEVICES,
					} )
				}
			/>
			<FontSize
				value={ fontSize }
				onChange={ ( value ) =>
					onChange( { value, propName: 'fontSize', devices } )
				}
				onClear={ () =>
					onChange( { value: '', propName: 'fontSize', devices } )
				}
			/>
			<LineHeight
				value={ lineHeight }
				onChange={ ( value ) =>
					onChange( { value, propName: 'lineHeight', devices } )
				}
				onClear={ () =>
					onChange( { value: '', propName: 'lineHeight', devices } )
				}
			/>
			<LetterSpacing
				value={ letterSpacing }
				onChange={ ( value ) =>
					onChange( { value, propName: 'letterSpacing', devices } )
				}
				onClear={ () =>
					onChange( {
						value: '',
						propName: 'letterSpacing',
						devices,
					} )
				}
			/>
		</>
	);
}
