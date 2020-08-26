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
		col: 'scb-col',
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
	},
};
export const SELECTORS = {
	blockMainSelectorAlias: 'selector',
	blockMainSelectorHoverAlias: 'selector:hover',
	button: {
		text: {
			selector: '.scb-button-text',
			alias: 'text',
		},
		icon: {
			selector: '.scb-icon',
			alias: 'icon',
		},
	},
	column: {
		content: {
			selector: '> .scb-column-content',
			alias: 'content',
		},
		col: {
			selector: '.scb-col',
		},
		link: {
			selector: 'uidSelector a',
			alias: 'link',
		},
		linkHover: {
			selector: 'uidSelector a:hover',
			alias: 'linkHover',
		},
	},
	columns: {
		allColumns: {
			selector: 'uidSelector > .scb-column',
			alias: 'allColumns',
		},
		allColumnsContent: {
			selector: 'uidSelector > .scb-column > .scb-column-content',
			alias: 'allColumnsContent',
		},
	},
	container: {
		content: {
			selector: '> .scb-container-content',
			alias: 'content',
		},
	},
	heading: {
		link: {
			selector: 'a',
			alias: 'link',
		},
		linkHover: {
			selector: 'a:hover',
			alias: 'linkHover',
		},
		highlightText: {
			selector: 'mark',
			alias: 'highlightText',
		},
	},
};
