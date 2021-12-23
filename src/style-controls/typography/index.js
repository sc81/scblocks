/**
 * ScBlocks dependencies
 */
import { getPropertiesValue, setPropValue } from '@scblocks/css-utils';
import { ALL_DEVICES } from '@scblocks/constants';
/**
 * Internal dependencies
 */
import TextTransform from './text-transform';
import FontWeight from './font-weight';
import FontFamily from './font-family';
import FontStyle from './font-style';
import TextDecoration from './text-decoration';
import FontSize from './font-size';
import LineHeight from './line-height';
import LetterSpacing from './letter-spacing';
import TextAlign from './text-align';

export default function Typography( props ) {
	const { devices, attributes, setAttributes, selectorSettings } = props;
	let { selector } = props;
	const typographySelector =
		selectorSettings.allowedPanels.typography.selector;
	selector =
		( typeof typographySelector === 'string' && typographySelector ) ||
		selector;

	function onChange( obj ) {
		setPropValue( {
			selector,
			attributes,
			setAttributes,
			...obj,
		} );
	}

	const {
		textTransform,
		fontWeight,
		textDecoration,
		fontStyle,
		fontFamily,
	} = getPropertiesValue( {
		attributes,
		devices: ALL_DEVICES,
		selector,
		props: [
			'textTransform',
			'fontWeight',
			'textDecoration',
			'fontStyle',
			'fontFamily',
		],
	} );
	const {
		fontSize,
		lineHeight,
		letterSpacing,
		textAlign,
	} = getPropertiesValue( {
		attributes,
		devices,
		selector,
		props: [ 'fontSize', 'lineHeight', 'letterSpacing', 'textAlign' ],
	} );

	return (
		<>
			<TextAlign
				value={ textAlign }
				onChange={ ( value ) =>
					onChange( { value, propName: 'textAlign', devices } )
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
			<FontFamily
				value={ fontFamily }
				onChange={ ( value ) =>
					onChange( {
						value,
						propName: 'fontFamily',
						devices: ALL_DEVICES,
					} )
				}
				onClear={ () =>
					onChange( {
						value: '',
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
		</>
	);
}
