/**
 * WordPress dependencies
 */
import { useState, useMemo } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { applyFilters } from '@wordpress/hooks';
import { PanelBody } from '@wordpress/components';

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
			getLastActivePanel( blockMemo ).controlsPanel[ selectorId ] ||
			Object.keys( selectorsSettings[ index ].panels )[ 0 ]
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
				<PanelBody
					title={ __( 'Colors', 'scblocks' ) }
					onToggle={ () => onClickPanel( 'colors' ) }
					opened={ openedPanel === 'colors' }
				>
					<ColorSet
						{ ...props }
						selectorSettings={ selectorsSettings[ index ] }
					/>
				</PanelBody>
			) }
			{ isVisiblePanel.typography && (
				<PanelBody
					title={ __( 'Typography', 'scblocks' ) }
					onToggle={ () => onClickPanel( 'typography' ) }
					opened={ openedPanel === 'typography' }
				>
					<Typography
						{ ...props }
						selectorSettings={ selectorsSettings[ index ] }
					/>
				</PanelBody>
			) }
			{ isVisiblePanel.background && (
				<PanelBody
					title={ __( 'Background', 'scblocks' ) }
					onToggle={ () => onClickPanel( 'background' ) }
					opened={ openedPanel === 'background' }
				>
					<Background { ...props } />
				</PanelBody>
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
				<PanelBody
					title={ __( 'Flex', 'scblocks' ) }
					onToggle={ () => onClickPanel( 'flex' ) }
					opened={ openedPanel === 'flex' }
				>
					<FlexPanel
						{ ...props }
						selectorSettings={ selectorsSettings[ index ] }
					/>
				</PanelBody>
			) }
			{ isVisiblePanel.space && (
				<PanelBody
					title={ __( 'Space', 'scblocks' ) }
					onToggle={ () => onClickPanel( 'space' ) }
					opened={ openedPanel === 'space' }
				>
					<Space
						{ ...props }
						selectorSettings={ selectorsSettings[ index ] }
					/>
				</PanelBody>
			) }
			{ isVisiblePanel.border && (
				<PanelBody
					title={ __( 'Border', 'scblocks' ) }
					onToggle={ () => onClickPanel( 'border' ) }
					opened={ openedPanel === 'border' }
				>
					<BorderPanel
						{ ...props }
						selectorSettings={ selectorsSettings[ index ] }
					/>
				</PanelBody>
			) }
			{ isVisiblePanel.position && (
				<PanelBody
					title={ __( 'Position', 'scblocks' ) }
					onToggle={ () => onClickPanel( 'position' ) }
					opened={ openedPanel === 'position' }
				>
					<PositionPanel
						{ ...props }
						selectorSettings={ selectorsSettings[ index ] }
					/>
				</PanelBody>
			) }
			{ isVisiblePanel.shapes && (
				<PanelBody
					title={ __( 'Shapes', 'scblocks' ) }
					onToggle={ () => onClickPanel( 'shapes' ) }
					opened={ openedPanel === 'shapes' }
				>
					{ shapesPanelControls }
				</PanelBody>
			) }
		</>
	);
}
