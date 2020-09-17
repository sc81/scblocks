/**
 * WordPress dependencies
 */
import { Path, SVG, Rect } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { DESKTOP_DEVICES } from '../../constants';
import { COLUMN_NAME } from '../column/utils';
import { BLOCK_SELECTOR } from '../../block/constants';
import { COLUMNS_NAME } from '../columns/utils';

function getColumnState( width ) {
	return [
		COLUMN_NAME,
		{
			css: {
				[ DESKTOP_DEVICES ]: {
					[ BLOCK_SELECTOR.blockMainSelectorAlias ]: [
						`width:${ width }%`,
					],
				},
			},
		},
	];
}
function getColumns( widths ) {
	return [
		COLUMNS_NAME,
		{},
		widths.map( ( width ) => getColumnState( width ) ),
	];
}

/** @typedef {import('@wordpress/blocks').WPBlockVariation} WPBlockVariation */

/**
 * Template option choices for predefined columns layouts.
 *
 * @type {WPBlockVariation[]}
 */
export const variations = [
	{
		name: 'one-column',
		title: __( '100', 'scblocks' ),
		description: __( 'One column', 'scblocks' ),
		icon: (
			<SVG
				xmlns="http://www.w3.org/2000/svg"
				width="48"
				height="48"
				viewBox="0 0 48 48"
			>
				<Rect
					fill="none"
					x="6"
					y="12"
					width="36"
					height="24"
					rx="3"
					stroke="#007CBA"
					stroke-width="2"
				/>
			</SVG>
		),
		isDefault: true,
		innerBlocks: [ [ 'core/paragraph' ] ],
		scope: [ 'block' ],
	},
	{
		name: 'two-columns-equal',
		title: __( '50 / 50', 'scblocks' ),
		description: __( 'Two columns; equal split', 'scblocks' ),
		icon: (
			<SVG
				width="48"
				height="48"
				viewBox="0 0 48 48"
				xmlns="http://www.w3.org/2000/svg"
			>
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M39 12C40.1046 12 41 12.8954 41 14V34C41 35.1046 40.1046 36 39 36H9C7.89543 36 7 35.1046 7 34V14C7 12.8954 7.89543 12 9 12H39ZM39 34V14H25V34H39ZM23 34H9V14H23V34Z"
				/>
			</SVG>
		),
		innerBlocks: [ getColumns( [ 50, 50 ] ) ],
		scope: [ 'block' ],
	},
	{
		name: 'two-columns-one-third-two-thirds',
		title: __( '30 / 70', 'scblocks' ),
		description: __(
			'Two columns; one-third, two-thirds split',
			'scblocks'
		),
		icon: (
			<SVG
				width="48"
				height="48"
				viewBox="0 0 48 48"
				xmlns="http://www.w3.org/2000/svg"
			>
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M39 12C40.1046 12 41 12.8954 41 14V34C41 35.1046 40.1046 36 39 36H9C7.89543 36 7 35.1046 7 34V14C7 12.8954 7.89543 12 9 12H39ZM39 34V14H20V34H39ZM18 34H9V14H18V34Z"
				/>
			</SVG>
		),
		innerBlocks: [ getColumns( [ 33.33, 66.66 ] ) ],
		scope: [ 'block' ],
	},
	{
		name: 'two-columns-two-thirds-one-third',
		title: __( '70 / 30', 'scblocks' ),
		description: __(
			'Two columns; two-thirds, one-third split',
			'scblocks'
		),
		icon: (
			<SVG
				width="48"
				height="48"
				viewBox="0 0 48 48"
				xmlns="http://www.w3.org/2000/svg"
			>
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M39 12C40.1046 12 41 12.8954 41 14V34C41 35.1046 40.1046 36 39 36H9C7.89543 36 7 35.1046 7 34V14C7 12.8954 7.89543 12 9 12H39ZM39 34V14H30V34H39ZM28 34H9V14H28V34Z"
				/>
			</SVG>
		),
		innerBlocks: [ getColumns( [ 66.66, 33.33 ] ) ],
		scope: [ 'block' ],
	},
	{
		name: 'three-columns-equal',
		title: __( '33 / 33 / 33', 'scblocks' ),
		description: __( 'Three columns; equal split', 'scblocks' ),
		icon: (
			<SVG
				width="48"
				height="48"
				viewBox="0 0 48 48"
				xmlns="http://www.w3.org/2000/svg"
			>
				<Path
					fillRule="evenodd"
					d="M41 14a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h30a2 2 0 0 0 2-2V14zM28.5 34h-9V14h9v20zm2 0V14H39v20h-8.5zm-13 0H9V14h8.5v20z"
				/>
			</SVG>
		),
		innerBlocks: [ getColumns( [ 33.33, 33.33, 33.33 ] ) ],
		scope: [ 'block' ],
	},
	{
		name: 'three-columns-wider-center',
		title: __( '25 / 50 / 25', 'scblocks' ),
		description: __( 'Three columns; wide center column', 'scblocks' ),
		icon: (
			<SVG
				width="48"
				height="48"
				viewBox="0 0 48 48"
				xmlns="http://www.w3.org/2000/svg"
			>
				<Path
					fillRule="evenodd"
					d="M41 14a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h30a2 2 0 0 0 2-2V14zM31 34H17V14h14v20zm2 0V14h6v20h-6zm-18 0H9V14h6v20z"
				/>
			</SVG>
		),
		innerBlocks: [ getColumnState( [ 25, 50, 25 ] ) ],
		scope: [ 'block' ],
	},
];
