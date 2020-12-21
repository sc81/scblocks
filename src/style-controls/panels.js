/**
 * WordPress dependencies
 */
import { G, Path, SVG, Button } from '@wordpress/components';
import { useState, useMemo } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * ScBlocks dependencies
 */
import { getLastActivePanel, setLastActivePanel } from '@scblocks/css-utils';
import { PLUGIN_NAME } from '@scblocks/constants';

/**
 * Internal dependencies
 */
import Background from './background/index';
import Typography from './typography/index';
import Space from './space/index';
import ColorSet from './color-set';
import BorderPanel from './border-panel';
import PositionPanel from './position-panel';

function Panel( {
	name,
	label,
	children,
	openedPanel,
	onClickPanel,
	panelCount,
} ) {
	if ( panelCount === 1 ) {
		return (
			<div className={ `${ PLUGIN_NAME }-components-panel-body-inner` }>
				{ children }
			</div>
		);
	}
	return (
		<div className="components-panel__body">
			<h2 className="components-panel__body-title">
				<Button
					className="components-panel__body-toggle"
					onClick={ () => onClickPanel( name ) }
					aria-expanded={ openedPanel === name }
				>
					{ /*
						Firefox + NVDA don't announce aria-expanded because the browser
						repaints the whole element, so this wrapping span hides that.
					*/ }
					<span aria-hidden="true">
						{ openedPanel === name ? (
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
					{ label }
				</Button>
			</h2>
			{ openedPanel === name && (
				<div
					className={ `${ PLUGIN_NAME }-components-panel-body-inner` }
				>
					{ children }
				</div>
			) }
		</div>
	);
}

export default function Panels( props ) {
	const {
		selectorId,
		selectorsSettings,
		blockMemo,
		spacePanelAdditionalControls = null,
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
			{ isVisiblePanel.space && (
				<Panel
					name="space"
					label={ __( 'Space', 'scblocks' ) }
					onClickPanel={ onClickPanel }
					openedPanel={ openedPanel }
					panelCount={ panelCount }
				>
					<>
						{ spacePanelAdditionalControls }
						<Space
							{ ...props }
							selectorSettings={ selectorsSettings[ index ] }
						/>
					</>
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
		</>
	);
}
