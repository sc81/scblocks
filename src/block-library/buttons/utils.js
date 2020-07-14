/**
 * Internal dependencies
 */
import { PLUGIN_NAME } from '../../constants';

export const BUTTONS_CLASS = `${ PLUGIN_NAME }-buttons`;
export const BUTTONS_SELECTOR = 'selector';
export const BUTTONS_HOVER_SELECTOR = 'selector:hover';

export const selectors = [
	{
		label: 'Button',
		selector: BUTTONS_SELECTOR,
		allowedPanels: {
			typography: true,
			background: true,
			backgroundOverlay: true,
			border: true,
			space: {
				margin: true,
				padding: true,
			},
		},
		useEditorBlockListSelector: true,
	},
];
