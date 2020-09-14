/**
 * WordPress dependencies
 */
import { Button, NavigableMenu, Dropdown } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { PLUGIN_NAME } from '../../constants';

export default function DropdownUnits( { units, value, onChangeUnit } ) {
	return (
		<>
			{ units.length === 1 && <span>{ units[ 0 ] }</span> }
			{ units.length > 1 && (
				<Dropdown
					className={ `components-dropdown-menu ${ PLUGIN_NAME }-dropdown-units` }
					contentClassName={ `${ PLUGIN_NAME }-dropdown-units-popover` }
					renderToggle={ ( { isOpen, onToggle } ) => (
						<Button
							onClick={ onToggle }
							aria-expanded={ isOpen }
							isPrimary
							isSmall
							aria-pressed
						>
							<span>{ value }</span>
						</Button>
					) }
					renderContent={ ( { onClose } ) => (
						<NavigableMenu>
							{ units.map( ( unit ) => {
								return (
									<Button
										key={ unit }
										className={ `components-dropdown-menu__menu-item${
											unit === value ? ' is-active' : ''
										}` }
										onClick={ () => {
											onClose();
											onChangeUnit( unit );
										} }
									>
										{ unit }
									</Button>
								);
							} ) }
						</NavigableMenu>
					) }
				/>
			) }
		</>
	);
}
