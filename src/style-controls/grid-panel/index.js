/**
 * WordPress dependencies
 */
import { useMemo } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import usePanelActiveControl from '../use-panel-active-control';
import { getControlSelector } from '../utils';
import TextProperty from '../text-property';
import Gap from '../gap';

const gridProps = [
	'gridTemplateColumns',
	'gridTemplateRows',
	'gridColumn',
	'gridRow',
	'gap',
	'gridTemplateAreas',
	'gridAutoFlow',
	'gridAutoColumns',
	'gridAutoRows',
	'gridArea'
];

export default function GridPanel( props ) {
	const { selectorSettings } = props;
	const {
		gridTemplateColumns,
		gridTemplateRows,
		gridColumn,
		gridRow,
		gap,
		gridTemplateAreas,
		gridAutoFlow,
		gridAutoColumns,
		gridAutoRows,
		gridArea
	} = usePanelActiveControl( selectorSettings, gridProps, 'grid' );

	const propSelector = useMemo( () => {
		const state = {};
		gridProps.forEach( ( prop ) => {
			state[ prop ] = getControlSelector(
				'grid',
				prop,
				selectorSettings
			);
		} );
		return state;
	}, [ selectorSettings ] );

	return (
		<>
			{ gridTemplateColumns && (
				<TextProperty
					label={ __( 'Grid-Template-Columns', 'scblocks' ) }
					{ ...props }
					selector={ propSelector.gridTemplateColumns }
					propName="gridTemplateColumns"
				/>
			) }
			{ gridTemplateRows && (
				<TextProperty
					label={ __( 'Grid-Template-Rows', 'scblocks' ) }
					{ ...props }
					selector={ propSelector.gridTemplateRows }
					propName="gridTemplateRows"
				/>
			) }
			{ gridColumn && (
				<TextProperty
					label={ __( 'Grid-Column', 'scblocks' ) }
					{ ...props }
					selector={ propSelector.gridColumn }
					propName="gridColumn"
				/>
			) }
			{ gridRow && (
				<TextProperty
					label={ __( 'Grid-Row', 'scblocks' ) }
					{ ...props }
					selector={ propSelector.gridRow }
					propName="gridRow"
				/>
			) }
			{ gap && <Gap { ...props } selector={ propSelector.gap } /> }
			{ gridTemplateAreas && (
				<TextProperty
					label={ __( 'Grid-Template-Areas', 'scblocks' ) }
					{ ...props }
					selector={ propSelector.gridTemplateAreas }
					propName="gridTemplateAreas"
				/>
			) }
			{ gridAutoFlow && (
				<TextProperty
					label={ __( 'Grid-Auto-Flow', 'scblocks' ) }
					{ ...props }
					selector={ propSelector.gridAutoFlow }
					propName="gridAutoFlow"
				/>
			) }
			{ gridAutoColumns && (
				<TextProperty
					label={ __( 'Grid-Auto-Columns', 'scblocks' ) }
					{ ...props }
					selector={ propSelector.gridAutoColumns }
					propName="gridAutoColumns"
				/>
			) }
			{ gridAutoRows && (
				<TextProperty
					label={ __( 'Grid-Auto-Rows', 'scblocks' ) }
					{ ...props }
					selector={ propSelector.gridAutoRows }
					propName="gridAutoRows"
				/>
			) }
			{ gridArea && (
				<TextProperty
					label={ __( 'Grid-Area', 'scblocks' ) }
					{ ...props }
					selector={ propSelector.gridArea }
					propName="gridArea"
				/>
			) }
		</>
	);
}
