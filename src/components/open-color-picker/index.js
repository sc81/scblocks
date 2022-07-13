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
import ButtonClear from '../button-clear';

export default function OpenColorPicker( {
	value,
	setFocus,
	onChange,
	label,
	isStacked,
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
	const stacked = isStacked ? ' is-stacked' : '';

	return (
		<Dropdown
			className="scblocks-color-picker"
			contentClassName="components-color-palette__picker"
			position="top right"
			renderToggle={ ( { isOpen, onToggle } ) => (
				<div className={ `scblocks-color-picker-triggers${ stacked }` }>
					<div className="scblocks-color-picker-label">
						<span>{ label }</span>
						{ colors.currentColor && (
							<ButtonClear
								onClear={ () => {
									onChange( '' );
									if ( isOpen ) {
										onToggle();
									}
								} }
							/>
						) }
					</div>
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
					<div className="components-color-picker__body scblocks-color-picker-body">
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
