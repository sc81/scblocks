/**
 * WordPress dependencies
 */
import { useState, useMemo } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
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
import ColorSet from './color-set';
import BorderPanel from './border-panel';
import PositionPanel from './position-panel';
import Panel from './panel';
import FlexPanel from './flex-panel';

export default function Panels( props ) {
	const {
		selectorId,
		selectorsSettings,
		blockMemo,
		shapesPanelControls,
	} = props;

	const index = useMemo( () => {
		return selectorsSettings.findIndex(
			( element ) => element.id === selectorId
		);
	}, [ selectorId, selectorsSettings ] );

	const [ isVisiblePanel, panelCount ] = useMemo( () => {
		const state = {};
		let count = 0;
		Object.keys( selectorsSettings[ index ].allowedPanels ).forEach(
			( name ) => {
				state[ name ] = true;
				count++;
			}
		);

		return [ state, count ];
	}, [ selectorsSettings, index ] );

	const [ openedPanel, setOpenedPanel ] = useState( () => {
		return (
			getLastActivePanel( blockMemo ).controlsPanel[ selectorId ] ||
			Object.keys( selectorsSettings[ index ].allowedPanels )[ 0 ]
		);
	} );

	function onClickPanel( value ) {
		if ( openedPanel === value ) {
			value = null;
		}
		setLastActivePanel( blockMemo, 'controlsPanel', {
			[ selectorId ]: value,
		} );
		setOpenedPanel( value );
	}

	return (
		<>
			{ isVisiblePanel.colors && (
				<Panel
					name="colors"
					label={ __( 'Colors', 'scblocks' ) }
					onClickPanel={ onClickPanel }
					openedPanel={ openedPanel }
					panelCount={ panelCount }
				>
					<ColorSet
						{ ...props }
						selectorSettings={ selectorsSettings[ index ] }
					/>
				</Panel>
			) }
			{ isVisiblePanel.typography && (
				<Panel
					name="typography"
					label={ __( 'Typography', 'scblocks' ) }
					onClickPanel={ onClickPanel }
					openedPanel={ openedPanel }
					panelCount={ panelCount }
				>
					<Typography
						{ ...props }
						selectorSettings={ selectorsSettings[ index ] }
					/>
				</Panel>
			) }
			{ isVisiblePanel.background && (
				<Panel
					name="background"
					label={ __( 'Background', 'scblocks' ) }
					onClickPanel={ onClickPanel }
					openedPanel={ openedPanel }
					panelCount={ panelCount }
				>
					<Background { ...props } />
				</Panel>
			) }
			{ applyFilters(
				'scblocks.stylePanels.afterBackground',
				null,
				props,
				{
					onClickPanel,
					openedPanel,
					isVisiblePanel,
					panelCount,
					selectorIndex: index,
				}
			) }
			{ isVisiblePanel.flex && (
				<Panel
					name="flex"
					label={ __( 'Flex', 'scblocks' ) }
					onClickPanel={ onClickPanel }
					openedPanel={ openedPanel }
					panelCount={ panelCount }
				>
					<FlexPanel
						{ ...props }
						selectorSettings={ selectorsSettings[ index ] }
					/>
				</Panel>
			) }
			{ isVisiblePanel.space && (
				<Panel
					name="space"
					label={ __( 'Space', 'scblocks' ) }
					onClickPanel={ onClickPanel }
					openedPanel={ openedPanel }
					panelCount={ panelCount }
				>
					<Space
						{ ...props }
						selectorSettings={ selectorsSettings[ index ] }
					/>
				</Panel>
			) }
			{ isVisiblePanel.border && (
				<Panel
					name="border"
					label={ __( 'Border', 'scblocks' ) }
					onClickPanel={ onClickPanel }
					openedPanel={ openedPanel }
					panelCount={ panelCount }
				>
					<BorderPanel
						{ ...props }
						selectorSettings={ selectorsSettings[ index ] }
					/>
				</Panel>
			) }
			{ isVisiblePanel.position && (
				<Panel
					name="position"
					label={ __( 'Position', 'scblocks' ) }
					onClickPanel={ onClickPanel }
					openedPanel={ openedPanel }
					panelCount={ panelCount }
				>
					<PositionPanel
						{ ...props }
						selectorSettings={ selectorsSettings[ index ] }
					/>
				</Panel>
			) }
			{ isVisiblePanel.shapes && (
				<Panel
					name="shapes"
					label={ __( 'Shapes', 'scblocks' ) }
					onClickPanel={ onClickPanel }
					openedPanel={ openedPanel }
					panelCount={ panelCount }
				>
					{ shapesPanelControls }
				</Panel>
			) }
		</>
	);
}
