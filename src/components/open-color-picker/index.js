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
/**
 * Internal dependencies
 */
import { PLUGIN_NAME, CORE_EDITOR_STORE_NAME } from '../../constants';

export default function OpenColorPicker( {
	value,
	setFocus,
	onChange,
	label,
} ) {
	const colors = useSelect( ( select ) => {
		return select( CORE_EDITOR_STORE_NAME ).getEditorSettings().colors;
	}, [] );

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
						{ value && (
							<Button
								isSmall
								isSecondary
								onClick={ () => onChange( '' ) }
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
								style={ { backgroundColor: value } }
							/>
						</button>
					</div>
				</div>
			) }
			renderContent={ () => (
				<div className="components-color-picker">
					<ColorPicker
						key={ pickerKey.current }
						color={ value }
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
						<ColorPalette
							colors={ colors }
							value={ value }
							onChange={ ( color ) => {
								onChange( color );
								pickerKey.current++;
							} }
							disableCustomColors={ true }
							clearable={ false }
						/>
					</div>
				</div>
			) }
		/>
	);
}
