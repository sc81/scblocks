/**
 * WordPress dependencies
 */
import { useSelect } from '@wordpress/data';
import {
	Dropdown,
	ColorPicker,
	Button,
	ColorPalette,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useRef } from '@wordpress/element';
import { applyFilters } from '@wordpress/hooks';
/**
 * ScBlocks dependencies
 */
import { PLUGIN_NAME, CORE_EDITOR_STORE_NAME } from '@scblocks/constants';

export default function OpenColorPicker( {
	value,
	setFocus,
	onChange,
	label,
} ) {
	const themeColors = useSelect( ( select ) => {
		return select( CORE_EDITOR_STORE_NAME ).getEditorSettings().colors;
	}, [] );

	const colors = applyFilters( 'scblocks.colorPicker.value', {
		currentColor: value,
		themeColors,
	} );

	const pickerKey = useRef( 1 );

	label = label || __( 'Text color', 'scblocks' );

	return (
		<Dropdown
			className={ `${ PLUGIN_NAME }-color-picker-wrapper` }
			contentClassName={ `components-color-palette__picker ${ PLUGIN_NAME }-color-picker-popover` }
			position="top right"
			renderToggle={ ( { isOpen, onToggle } ) => (
				<div className={ `${ PLUGIN_NAME }-inline-elements` }>
					<span>{ label }</span>
					<div className={ `${ PLUGIN_NAME }-inline-buttons` }>
						{ colors.currentColor && (
							<Button
								isSmall
								isSecondary
								onClick={ () => {
									onChange( '' );
									if ( isOpen ) {
										onToggle();
									}
								} }
							>
								{ __( 'Clear', 'scblocks' ) }
							</Button>
						) }
						<button
							type="button"
							aria-expanded={ isOpen }
							className={ `${ PLUGIN_NAME }-color-picker-open-button` }
							onClick={ () => {
								if ( setFocus ) {
									setFocus();
								}

								onToggle();
							} }
						>
							<span
								className={ `${ PLUGIN_NAME }-color-picker-indicator` }
								style={ {
									backgroundColor: colors.currentColor,
								} }
							/>
						</button>
					</div>
				</div>
			) }
			renderContent={ () => (
				<div className="components-color-picker">
					<ColorPicker
						key={ pickerKey.current }
						color={ colors.currentColor }
						onChangeComplete={ ( color ) => {
							let next;
							const { r, g, b, a } = color.rgb;
							if ( a === 1 ) {
								next = color.hex;
							} else {
								next = `rgba(${ r },${ g },${ b },${ a })`;
							}
							onChange( next );
						} }
					/>
					<div
						className={ `components-color-picker__body ${ PLUGIN_NAME }-color-picker-body` }
					>
						{ applyFilters(
							'scblocks.colorPicker.palette',
							<ColorPalette
								colors={ themeColors }
								value={ colors.currentColor }
								onChange={ ( color ) => {
									onChange( color );
									pickerKey.current++;
								} }
								disableCustomColors={ true }
								clearable={ false }
							/>,
							{
								colors,
								onChange,
							},
							pickerKey
						) }
					</div>
				</div>
			) }
		/>
	);
}
