/**
 * WordPress dependencies
 */
import { useSelect } from '@wordpress/data';
import { Dropdown, ColorPicker, ColorPalette } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useRef } from '@wordpress/element';
import { applyFilters } from '@wordpress/hooks';
/**
 * ScBlocks dependencies
 */
import { CORE_EDITOR_STORE_NAME } from '@scblocks/constants';
/**
 * Internal dependencies
 */
import ControlWrapper from '../control-wrapper';

export default function OpenColorPicker( {
	value,
	setFocus,
	onChange,
	label,
	isStacked,
	isIndicator = true,
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
			className="scblocks-color-picker"
			contentClassName="scblocks-color-picker-content"
			position="top right"
			renderToggle={ ( { isOpen, onToggle } ) => (
				<ControlWrapper
					label={ label }
					isClearButton={ !! colors.currentColor }
					onClear={ () => {
						onChange( '' );
						if ( isOpen ) {
							onToggle();
						}
					} }
					isIndicator={ isIndicator && !! colors.currentColor }
					isSelectDevice={ false }
					displayInline={ ! isStacked }
					widerHeader={ ! isStacked }
				>
					<button
						type="button"
						aria-expanded={ isOpen }
						className="scblocks-color-picker-open-button"
						onClick={ () => {
							if ( setFocus ) {
								setFocus();
							}

							onToggle();
						} }
						aria-label={
							isOpen
								? __( 'Close color picker' )
								: __( 'Open color picker' )
						}
						title={
							isOpen
								? __( 'Close color picker' )
								: __( 'Open color picker' )
						}
					>
						<span
							className="scblocks-color-picker-indicator"
							style={ {
								backgroundColor: colors.currentColor,
							} }
						/>
					</button>
				</ControlWrapper>
			) }
			renderContent={ () => (
				<>
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
					<div className="scblocks-color-picker-palette">
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
				</>
			) }
		/>
	);
}
