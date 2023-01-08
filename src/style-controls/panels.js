/**
 * WordPress dependencies
 */
import { useState, useMemo } from '@wordpress/element';
import { applyFilters } from '@wordpress/hooks';

/**
 * ScBlocks dependencies
 */
import { getLastActivePanel, setLastActivePanel } from '@scblocks/css-utils';

/**
 * Internal dependencies
 */
import Background from './background/index';
import Typography from './typography/index';
import Space from './space/index';
import ColorsPanel from './colors-panel';
import BorderPanel from './border-panel';
import PositionPanel from './position-panel';
import FlexPanel from './flex-panel';

export default function Panels( props ) {
	const { selectorId, selectorsSettings, blockMemo } = props;

	const index = useMemo( () => {
		return selectorsSettings.findIndex(
			( element ) => element.id === selectorId
		);
	}, [ selectorId, selectorsSettings ] );

	const isVisiblePanel = useMemo( () => {
		const state = {};
		Object.keys( selectorsSettings[ index ].panels ).forEach( ( name ) => {
			if (
				selectorsSettings[ index ].panels[ name ].isActive !== false
			) {
				state[ name ] = true;
			}
		} );

		return state;
	}, [ selectorsSettings, index ] );

	const [ openedPanel, setOpenedPanel ] = useState( () => {
		return (
			getLastActivePanel( blockMemo ).controlsPanel[ selectorId ] || ''
		);
	} );

	function onClickPanel( value ) {
		if ( openedPanel === value ) {
			value = '';
		}
		setLastActivePanel( blockMemo, 'controlsPanel', {
			[ selectorId ]: value,
		} );
		setOpenedPanel( value );
	}

	return (
		<>
			{ isVisiblePanel.colors && (
				<ColorsPanel
					{ ...props }
					selectorSettings={ selectorsSettings[ index ] }
					openedPanel={ openedPanel }
					onClickPanel={ onClickPanel }
				/>
			) }
			{ isVisiblePanel.typography && (
				<Typography
					{ ...props }
					selectorSettings={ selectorsSettings[ index ] }
					openedPanel={ openedPanel }
					onClickPanel={ onClickPanel }
				/>
			) }
			{ isVisiblePanel.background && (
				<Background
					{ ...props }
					selectorSettings={ selectorsSettings[ index ] }
					openedPanel={ openedPanel }
					onClickPanel={ onClickPanel }
				/>
			) }
			{ applyFilters(
				'scblocks.stylePanels.afterBackground',
				null,
				props,
				{
					onClickPanel,
					openedPanel,
					isVisiblePanel,
					selectorIndex: index,
				}
			) }
			{ isVisiblePanel.flex && (
				<FlexPanel
					{ ...props }
					selectorSettings={ selectorsSettings[ index ] }
					openedPanel={ openedPanel }
					onClickPanel={ onClickPanel }
				/>
			) }
			{ isVisiblePanel.space && (
				<Space
					{ ...props }
					selectorSettings={ selectorsSettings[ index ] }
					openedPanel={ openedPanel }
					onClickPanel={ onClickPanel }
				/>
			) }
			{ isVisiblePanel.border && (
				<BorderPanel
					{ ...props }
					selectorSettings={ selectorsSettings[ index ] }
					openedPanel={ openedPanel }
					onClickPanel={ onClickPanel }
				/>
			) }
			{ isVisiblePanel.position && (
				<PositionPanel
					{ ...props }
					selectorSettings={ selectorsSettings[ index ] }
					openedPanel={ openedPanel }
					onClickPanel={ onClickPanel }
				/>
			) }
			{ applyFilters( 'scblocks.stylePanels.afterAll', null, props, {
				onClickPanel,
				openedPanel,
				isVisiblePanel,
				selectorIndex: index,
			} ) }
		</>
	);
}
