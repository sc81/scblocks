/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * ScBlocks dependencies
 */
import { BLOCK_SELECTOR } from '@scblocks/block';
import { DESKTOP_DEVICE, ALL_DEVICES } from '@scblocks/constants';

/**
 * Internal dependencies
 */
import { BUTTON_BLOCK_NAME } from '../button/utils';

function getButton() {
	return [
		BUTTON_BLOCK_NAME,
		{
			css: {
				[ ALL_DEVICES ]: {
					[ BLOCK_SELECTOR.button.main.alias ]: [
						'color:#ffffff',
						'backgroundColor:#007cba',
					],
				},
				[ DESKTOP_DEVICE ]: {
					[ BLOCK_SELECTOR.button.main.alias ]: [
						'padding:12px 20px',
					],
				},
			},
		},
	];
}

/**
 * Template option choices for predefined buttons layouts.
 */
const variations = [
	{
		name: 'one-button',
		title: __( 'One button', 'scblocks' ),
		isDefault: true,
		innerBlocks: [ getButton() ],
		scope: [ 'block' ],
		icon: (
			<svg width="48" height="48" xmlns="http://www.w3.org/2000/svg">
				<rect
					fill="#000000"
					fillOpacity="0"
					height="18.5"
					stroke="#1888c0"
					strokeWidth="2"
					width="34.5"
					x="6.75"
					y="14.75"
				/>
				<line
					fill="none"
					fillOpacity="0"
					stroke="#1888c0"
					strokeWidth="2"
					x1="10.025"
					x2="37.975"
					y1="24"
					y2="24"
				/>
			</svg>
		),
	},
	{
		name: 'two-buttons',
		title: __( 'Two buttons', 'scblocks' ),
		innerBlocks: [ getButton(), getButton() ],
		scope: [ 'block' ],
		icon: (
			<svg width="48" height="48" xmlns="http://www.w3.org/2000/svg">
				<rect
					fill="#000000"
					fillOpacity="0"
					height="18.5"
					stroke="#1888c0"
					strokeWidth="2"
					width="34.5"
					x="6.75"
					y="14.75"
				/>
				<line
					fill="none"
					fillOpacity="0"
					stroke="#1888c0"
					strokeWidth="2"
					x1="11"
					x2="21.05"
					y1="24"
					y2="24"
				/>
				<line
					fill="none"
					fillOpacity="0"
					stroke="#1888c0"
					strokeWidth="2"
					x1="27.125"
					x2="37.175"
					y1="24"
					y2="24"
				/>
			</svg>
		),
	},
	{
		name: 'three-buttons',
		title: __( 'Three buttons', 'scblocks' ),
		innerBlocks: [ getButton(), getButton(), getButton() ],
		scope: [ 'block' ],
		icon: (
			<svg width="48" height="48" xmlns="http://www.w3.org/2000/svg">
				<rect
					fill="#000000"
					fillOpacity="0"
					height="18.5"
					stroke="#1888c0"
					strokeWidth="2"
					width="34.5"
					x="6.75"
					y="14.75"
				/>
				<line
					fill="none"
					fillOpacity="0"
					stroke="#1888c0"
					strokeWidth="2"
					x1="9.3"
					x2="18.15"
					y1="24"
					y2="24"
				/>
				<line
					fill="none"
					fillOpacity="0"
					stroke="#1888c0"
					strokeWidth="2"
					x1="29.825"
					x2="38.075"
					y1="24"
					y2="24"
				/>
				<line
					fill="none"
					fillOpacity="0"
					stroke="#1888c0"
					strokeWidth="2"
					x1="20.225"
					x2="27.975"
					y1="24"
					y2="24"
				/>
			</svg>
		),
	},
];
export default variations;
