export const BLOCK_CLASSES = {
	button: {
		main: 'scb-button',
		link: 'scb-button-link',
		text: 'scb-button-text',
		icon: 'scb-button-icon',
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
		text: 'scb-heading-text',
		icon: 'scb-heading-icon',
	},
};
export const SELECTORS = {
	blockMainSelectorAlias: 'selector',
	button: {
		link: {
			selector: '.scb-button-link',
			alias: 'link',
		},
		text: {
			selector: '.scb-button-text',
			alias: 'text',
		},
		icon: {
			selector: '.scb-button-icon',
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
		text: {
			selector: '.scb-heading-text',
			alias: 'text',
		},
		icon: {
			selector: '.scb-heading-icon',
			alias: 'icon',
		},
		svg: {
			selector: '.scb-heading-icon svg',
			alias: 'svg',
		},
	},
};
