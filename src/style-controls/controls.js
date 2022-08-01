/**
 * WordPress dependencies
 */
import { useState } from '@wordpress/element';
import { PanelBody } from '@wordpress/components';
import { applyFilters } from '@wordpress/hooks';

/**
 * ScBlocks dependencies
 */
import { getLastActivePanel, setLastActivePanel } from '@scblocks/css-utils';

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
				<PanelBody
					key={ element.id }
					className={ applyFilters(
						'scblocks.elementPanel.className',
						'scblocks-element-panel',
						{ ...props, selectorId: element.id }
					) }
					title={ element.label }
					onToggle={ () => onClickPanel( element.id ) }
					opened={ openedPanel === element.id }
				>
					<Panels { ...props } selectorId={ element.id } />
				</PanelBody>
			);
		}
	} );
	return <>{ elements }</>;
}
