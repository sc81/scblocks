export const BLOCK_CLASSES = {
	button: {
		main: 'scb-button',
		text: 'scb-button-text',
		icon: 'scb-icon',
	},
	buttons: {
		main: 'scb-buttons',
	},
	column: {
		main: 'scb-column',
		content: 'scb-column-content',
		inner: 'scb-inner-column',
	},
	columns: {
		main: 'scb-columns',
	},
	container: {
		main: 'scb-container',
		content: 'scb-container-content',
		videoWrapper: 'scb-bg-video-wrapper',
		video: 'scb-bg-video',
		rootContainer: 'scb-root-container',
	},
	heading: {
		main: 'scb-heading',
		text: 'scb-heading-text',
		icon: 'scb-icon',
	},
};
export const BLOCK_SELECTOR = {
	button: {
		main: {
			fullSelector: ( uidClass ) => `.scb-button.${ uidClass }`,
			alias: 'main',
		},
		mainHover: {
			fullSelector: ( uidClass ) => `.scb-button.${ uidClass }:hover`,
			alias: 'mainHover',
		},
		text: {
			selector: '.scb-button-text',
		},
		icon: {
			selector: '.scb-icon',
			fullSelector: ( uidClass ) => `.scb-button.${ uidClass } .scb-icon`,
			alias: 'icon',
		},
	},
	buttons: {
		main: {
			fullSelector: ( uidClass ) => `.scb-buttons.${ uidClass }`,
			alias: 'main',
		},
		button: {
			fullSelector: ( uidClass ) => `.${ uidClass } .scb-button`,
			alias: 'button',
		},
		buttonHover: {
			fullSelector: ( uidClass ) => `.${ uidClass } .scb-button:hover`,
			alias: 'buttonHover',
		},
		icon: {
			fullSelector: ( uidClass ) => `.${ uidClass } .scb-icon`,
			alias: 'icon',
		},
	},
	column: {
		main: {
			fullSelector: ( uidClass ) => `.scb-column.${ uidClass }`,
			alias: 'main',
		},
		content: {
			fullSelector: ( uidClass ) =>
				`.scb-column.${ uidClass } > .scb-inner-column > .scb-column-content`,
			alias: 'content',
		},
		inner: {
			fullSelector: ( uidClass ) =>
				`.scb-column.${ uidClass } > .scb-inner-column`,
			alias: 'inner',
		},
		link: {
			fullSelector: ( uidClass ) => `.${ uidClass } a`,
			alias: 'link',
		},
		linkHover: {
			fullSelector: ( uidClass ) => `.${ uidClass } a:hover`,
			alias: 'linkHover',
		},
	},
	columns: {
		main: {
			fullSelector: ( uidClass ) => `.scb-columns.${ uidClass }`,
			alias: 'main',
		},
		column: {
			fullSelector: ( uidClass ) => `.${ uidClass } > .scb-column`,
			alias: 'column',
		},
		columnContent: {
			fullSelector: ( uidClass ) =>
				`.${ uidClass } > .scb-column > .scb-column-content`,
			alias: 'columnContent',
		},
	},
	container: {
		main: {
			fullSelector: ( uidClass ) => `.scb-container.${ uidClass }`,
			alias: 'main',
		},
		content: {
			fullSelector: ( uidClass ) =>
				`.scb-container.${ uidClass } > .scb-container-content`,
			alias: 'content',
		},
		link: {
			fullSelector: ( uidClass ) => `.${ uidClass } a`,
			alias: 'link',
		},
		linkHover: {
			fullSelector: ( uidClass ) => `.${ uidClass } a:hover`,
			alias: 'linkHover',
		},
	},
	heading: {
		main: {
			fullSelector: ( uidClass ) => `.scb-heading.${ uidClass }`,
			alias: 'main',
		},
		link: {
			fullSelector: ( uidClass ) => `.scb-heading.${ uidClass } a`,
			alias: 'link',
		},
		linkHover: {
			fullSelector: ( uidClass ) => `.scb-heading.${ uidClass } a:hover`,
			alias: 'linkHover',
		},
		highlightText: {
			fullSelector: ( uidClass ) => `.scb-heading.${ uidClass } mark`,
			alias: 'highlightText',
		},
		icon: {
			fullSelector: ( uidClass ) =>
				`.scb-heading.${ uidClass } .scb-icon`,
			selector: '.scb-icon',
			alias: 'icon',
		},
		text: {
			selector: '.scb-heading-text',
		},
	},
};
