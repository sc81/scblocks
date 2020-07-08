/**
 * WordPress dependencies
 */
import { Dropdown, Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { PLUGIN_NAME } from '../../constants';
import ControlWrapper from '../control-wrapper';

export default function DropdownComponent( {
	label,
	isValue,
	onClear,
	renderContent,
	onOpen,
	noSelectDevices,
} ) {
	return (
		<Dropdown
			className={ `${ PLUGIN_NAME }-dropdown` }
			contentClassName={ `${ PLUGIN_NAME }-dropdown-content` }
			renderToggle={ ( { onToggle, onClose, isOpen } ) => (
				<ControlWrapper
					label={ label }
					displayInline
					noSelectDevices={ noSelectDevices }
				>
					<div className={ `${ PLUGIN_NAME }-inline-buttons` }>
						{ isValue && (
							<Button
								isSmall
								isSecondary
								onClick={ () => onClear( onClose ) }
							>
								{ __( 'Clear' ) }
							</Button>
						) }
						<Button
							icon="edit"
							isSmall
							isSecondary
							label={ __( 'Show settings' ) }
							onClick={ () => {
								onToggle();
								if (
									! isOpen &&
									typeof onOpen === 'function'
								) {
									onOpen();
								}
							} }
						/>
					</div>
				</ControlWrapper>
			) }
			renderContent={ () => (
				<div className={ `${ PLUGIN_NAME }-popover-content` }>
					{ renderContent }
				</div>
			) }
		/>
	);
}
