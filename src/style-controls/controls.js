/**
 * WordPress dependencies
 */
import { useState } from '@wordpress/element';
import { Icon, chevronDown, chevronUp } from '@wordpress/icons';

/**
 * ScBlocks dependencies
 */
import { getLastActivePanel, setLastActivePanel } from '@scblocks/css-utils';
import { PLUGIN_NAME } from '@scblocks/constants';

/**
 * Internal dependencies
 */
import Panels from './panels';

export default function StyleControls( props ) {
	const { selectorsSettings, blockMemo } = props;
	const [ openedPanel, setOpenedPanel ] = useState(
		getLastActivePanel( blockMemo ).selectorPanel
	);

	function onClickPanel( value ) {
		if ( openedPanel === value ) {
			value = null;
		}
		setLastActivePanel( blockMemo, 'selectorPanel', value );
		setOpenedPanel( value );
	}

	const elements = [];

	selectorsSettings.forEach( ( element ) => {
		if ( element.isActive !== false ) {
			elements.push(
				<div
					key={ element.id }
					className={ `components-panel__body ${ PLUGIN_NAME }-components-panel-body` }
					data-expanded={ openedPanel === element.id }
				>
					<h2 className="components-panel__body-title">
						<button
							className={ `${ PLUGIN_NAME }-components-panel-body-button` }
							onClick={ () => onClickPanel( element.id ) }
							aria-expanded={ openedPanel === element.id }
							type="button"
						>
							{ /*
									 Firefox + NVDA don't announce aria-expanded because the browser
									 repaints the whole element, so this wrapping span hides that.
							 */ }
							<span aria-hidden="true">
								{ openedPanel === element.id ? (
									<Icon icon={ chevronUp } />
								) : (
									<Icon icon={ chevronDown } />
								) }
							</span>
							{ element.label }
						</button>
					</h2>
					{ openedPanel === element.id && (
						<Panels
							{ ...props }
							selector={ element.selector }
							selectorId={ element.id }
						/>
					) }
				</div>
			);
		}
	} );
	return <>{ elements }</>;
}
