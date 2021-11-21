/**
 * WordPress dependencies
 */
import { Path, SVG } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * ScBlocks dependencies
 */
import { BLOCK_SELECTOR } from '@scblocks/block';
import { DESKTOP_DEVICE } from '@scblocks/constants';

function getContainer() {
	return [
		'scblocks/container',
		{},
		[ [ 'core/paragraph', { placeholder: 'Paragraph in the container' } ] ],
	];
}

/**
 * Template option choices for predefined columns layouts.
 */
export const variations = [
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
		isDefault: true,
		innerBlocks: [ getContainer(), getContainer() ],
		scope: [ 'block' ],
		attributes: {
			css: {
				[ DESKTOP_DEVICE ]: {
					[ BLOCK_SELECTOR.grid.main.alias ]: [
						'grid-template-columns:1fr 1fr',
					],
				},
			},
		},
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
		innerBlocks: [ getContainer(), getContainer() ],
		scope: [ 'block' ],
		attributes: {
			css: {
				[ DESKTOP_DEVICE ]: {
					[ BLOCK_SELECTOR.grid.main.alias ]: [
						'grid-template-columns:1fr 2fr',
					],
				},
			},
		},
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
		innerBlocks: [ getContainer(), getContainer() ],
		scope: [ 'block' ],
		attributes: {
			css: {
				[ DESKTOP_DEVICE ]: {
					[ BLOCK_SELECTOR.grid.main.alias ]: [
						'grid-template-columns:2fr 1fr',
					],
				},
			},
		},
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
		innerBlocks: [ getContainer(), getContainer(), getContainer() ],
		scope: [ 'block' ],
		attributes: {
			css: {
				[ DESKTOP_DEVICE ]: {
					[ BLOCK_SELECTOR.grid.main.alias ]: [
						'grid-template-columns:1fr 1fr 1fr',
					],
				},
			},
		},
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
		innerBlocks: [ getContainer(), getContainer(), getContainer() ],
		scope: [ 'block' ],
		attributes: {
			css: {
				[ DESKTOP_DEVICE ]: {
					[ BLOCK_SELECTOR.grid.main.alias ]: [
						'grid-template-columns:1fr 2fr 1fr',
					],
				},
			},
		},
	},
	{
		name: 'four-columns-equal',
		title: __( '25 / 25 / 25 / 25', 'scblocks' ),
		description: __( 'Four columns; equal split', 'scblocks' ),
		icon: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="48"
				height="48"
				viewBox="0 0 48 48"
				fill="none"
			>
				<rect
					x="8"
					y="11"
					width="32"
					height="26"
					stroke="#007CBA"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					fill="none"
				/>
				<line
					x1="16"
					y1="12"
					x2="16"
					y2="36"
					stroke="#007CBA"
					strokeWidth="2"
				/>
				<line
					x1="24"
					y1="12"
					x2="24"
					y2="36"
					stroke="#007CBA"
					strokeWidth="2"
				/>
				<line
					x1="32"
					y1="12"
					x2="32"
					y2="36"
					stroke="#007CBA"
					strokeWidth="2"
				/>
			</svg>
		),
		innerBlocks: [
			getContainer(),
			getContainer(),
			getContainer(),
			getContainer(),
		],
		scope: [ 'block' ],
		attributes: {
			css: {
				[ DESKTOP_DEVICE ]: {
					[ BLOCK_SELECTOR.grid.main.alias ]: [
						'grid-template-columns:1fr 1fr 1fr 1fr',
					],
				},
			},
		},
	},
];
