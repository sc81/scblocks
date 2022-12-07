/**
 * WordPress dependencies
 */
import { applyFilters } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';
/**
 * ScBlocks dependencies
 */
import { getPropertiesValue, setPropValue } from '@scblocks/css-utils';
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
import StyleControlsPanel from '../style-controls-panel';
import { getSelector } from '../utils';

export default function Typography( props ) {
	const { devices, attributes, setAttributes, selectorSettings } = props;
	const selector = getSelector( 'typography', selectorSettings );
	function onChange( value, propName ) {
		setPropValue( {
			selector,
			attributes,
			setAttributes,
			devices,
			propName,
			value,
		} );
	}
	const {
		textTransform,
		fontWeight,
		textDecoration,
		fontStyle,
		fontFamily,
		fontSize,
		lineHeight,
		letterSpacing,
		textAlign,
	} = getPropertiesValue( {
		attributes,
		devices,
		selector,
		props: [
			'textTransform',
			'fontWeight',
			'textDecoration',
			'fontStyle',
			'fontFamily',
			'fontSize',
			'lineHeight',
			'letterSpacing',
			'textAlign',
		],
	} );

	return (
		<StyleControlsPanel
			{ ...props }
			panelTitle={ __( 'Typography', 'scblocks' ) }
			panelName="typography"
		>
			<TextAlign
				value={ textAlign }
				onChange={ ( value ) => onChange( value, 'textAlign' ) }
			/>
			<FontSize
				value={ fontSize }
				onChange={ ( value ) => onChange( value, 'fontSize' ) }
				onClear={ () => onChange( '', 'fontSize' ) }
			/>
			<LineHeight
				value={ lineHeight }
				onChange={ ( value ) => onChange( value, 'lineHeight' ) }
				onClear={ () => onChange( '', 'lineHeight' ) }
			/>
			<LetterSpacing
				value={ letterSpacing }
				onChange={ ( value ) => onChange( value, 'letterSpacing' ) }
				onClear={ () => onChange( '', 'letterSpacing' ) }
			/>
			<FontFamily
				value={ fontFamily }
				onChange={ ( value ) => onChange( value, 'fontFamily' ) }
				onClear={ () => onChange( '', 'fontFamily' ) }
			/>
			<TextTransform
				value={ textTransform }
				onChange={ ( value ) => onChange( value, 'textTransform' ) }
			/>
			<FontWeight
				value={ fontWeight }
				onChange={ ( value ) => onChange( value, 'fontWeight' ) }
			/>
			<TextDecoration
				value={ textDecoration }
				onChange={ ( value ) => onChange( value, 'textDecoration' ) }
			/>
			<FontStyle
				value={ fontStyle }
				onChange={ ( value ) => onChange( value, 'fontStyle' ) }
			/>
			{ applyFilters( 'scblocks.typographyPanel.afterAll', null, {
				...props,
				selector,
			} ) }
		</StyleControlsPanel>
	);
}
