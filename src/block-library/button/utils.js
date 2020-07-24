import { PLUGIN_NAME } from '../../constants';

export const BUTTON_BLOCK_NAME = `${ PLUGIN_NAME }/button`;

export const BUTTON_CLASS = `${ PLUGIN_NAME }-button`;
export const BUTTON_LINK_CLASS = `${ PLUGIN_NAME }-button-link`;
export const BUTTON_TEXT_CLASS = `${ PLUGIN_NAME }-button-text`;
export const BUTTON_ICON_CLASS = `${ PLUGIN_NAME }-button-icon`;

export const BUTTON_SELECTOR = 'selector';
export const BUTTON_LINK_SELECTOR = `.${ BUTTON_LINK_CLASS }`;
export const BUTTON_TEXT_SELECTOR = `.${ BUTTON_TEXT_CLASS }`;
export const BUTTON_ICON_SELECTOR = `.${ BUTTON_ICON_CLASS }`;

export const selectors = [
	{
		label: 'Button',
		selector: BUTTON_LINK_SELECTOR,
		allowedPanels: {
			background: true,
			typography: true,
			border: true,
			space: {
				padding: true,
				margin: true,
			},
			flex: {
				flexGrow: true,
			},
		},
		relatedSelectorProps: {
			selector: BUTTON_SELECTOR,
			props: [ 'margin', 'flexGrow' ],
		},
	},
];

export function getIconPositionClass( iconPosition ) {
	switch ( iconPosition ) {
		case 'after':
			return ` ${ PLUGIN_NAME }-icon-after`;
		case 'before':
			return ` ${ PLUGIN_NAME }-icon-before`;
	}
	return '';
}
