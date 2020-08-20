/**
 * WordPress dependencies
 */
import { G, Path, SVG } from '@wordpress/components';
import { useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import Panels from './panels';
import { PLUGIN_NAME } from '../constants';
import {
	getLastActivePanel,
	setLastActivePanel,
} from '../hooks/use-block-memo';
import { isActiveSelector } from '../hooks/use-selector-activity';

export function StyleControls( props ) {
	const { selectorsSettings, selectorsActivity, blockMemo } = props;
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

	return selectorsSettings.map( ( element ) => {
		if (
			selectorsActivity &&
			! isActiveSelector( selectorsActivity, element.selector )
		) {
			return null;
		}
		return (
			<div
				key={ element.selector }
				className={ `components-panel__body ${ PLUGIN_NAME }-components-panel-body` }
				data-expanded={ openedPanel === element.selector }
			>
				<h2 className="components-panel__body-title">
					<button
						className={ `${ PLUGIN_NAME }-components-panel-body-button` }
						onClick={ () => onClickPanel( element.selector ) }
						aria-expanded={ openedPanel === element.selector }
						type="button"
					>
						{ /*
                				Firefox + NVDA don't announce aria-expanded because the browser
                				repaints the whole element, so this wrapping span hides that.
            			*/ }
						<span aria-hidden="true">
							{ openedPanel === element.selector ? (
								<SVG
									className="components-panel__arrow"
									width="24px"
									height="24px"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<G>
										<Path fill="none" d="M0,0h24v24H0V0z" />
									</G>
									<G>
										<Path d="M12,8l-6,6l1.41,1.41L12,10.83l4.59,4.58L18,14L12,8z" />
									</G>
								</SVG>
							) : (
								<SVG
									className="components-panel__arrow"
									width="24px"
									height="24px"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<G>
										<Path fill="none" d="M0,0h24v24H0V0z" />
									</G>
									<G>
										<Path d="M7.41,8.59L12,13.17l4.59-4.58L18,10l-6,6l-6-6L7.41,8.59z" />
									</G>
								</SVG>
							) }
						</span>
						{ element.label }
					</button>
				</h2>
				{ openedPanel === element.selector && (
					<Panels { ...props } selector={ element.selector } />
				) }
			</div>
		);
	} );
}
