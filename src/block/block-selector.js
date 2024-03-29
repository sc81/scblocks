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
			selector: '.scb-container',
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
		shapes: {
			fullSelector: ( uidClass ) =>
				`.scb-container.${ uidClass } > .scb-shapes`,
			alias: 'shapes',
			selector: '.scb-shapes',
		},
		shape: {
			fullSelector: ( uidClass, shapeClass ) =>
				`.scb-container.${ uidClass } > .scb-shapes .${ shapeClass }`,
			alias: ( shapeId ) => `shape-${ shapeId }`,
			selector: '.scb-shape',
		},
		shapeSvg: {
			fullSelector: ( uidClass, shapeClass ) =>
				`.scb-container.${ uidClass } > .scb-shapes .${ shapeClass }`,
			alias: ( shapeId ) => `shape-svg-${ shapeId }`,
			selector: '.scb-shape svg',
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
