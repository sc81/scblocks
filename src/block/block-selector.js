export const BLOCK_SELECTOR = {
	button: {
		main: {
			fullSelector: ( uidClass ) => `.${ uidClass }`,
			alias: 'main',
		},
		mainHover: {
			fullSelector: ( uidClass ) => `.${ uidClass }:hover`,
			alias: 'mainHover',
		},
		text: {
			selector: '.scb-button-text',
		},
		icon: {
			selector: '.scb-icon',
			fullSelector: ( uidClass ) => `.${ uidClass } .scb-icon`,
			alias: 'icon',
		},
		iconSvg: {
			fullSelector: ( uidClass ) => `.${ uidClass } .scb-icon svg`,
			alias: 'iconSvg',
		},
	},
	buttons: {
		main: {
			fullSelector: ( uidClass ) => `.${ uidClass }`,
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
			fullSelector: ( uidClass ) => `.${ uidClass }`,
			alias: 'main',
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
			fullSelector: ( uidClass ) => `.${ uidClass }`,
			alias: 'main',
		},
		column: {
			fullSelector: ( uidClass ) => `.${ uidClass } > .scb-column`,
			alias: 'column',
		},
	},
	container: {
		main: {
			fullSelector: ( uidClass ) => `.${ uidClass }`,
			alias: 'main',
		},
		mainStronger: {
			fullSelector: ( uidClass ) => `.scb-container.${ uidClass }`,
			alias: 'mainStronger',
		},
		content: {
			fullSelector: ( uidClass ) =>
				`.${ uidClass } > .scb-container-content`,
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
			fullSelector: ( uidClass ) => `.${ uidClass } > .scb-shapes`,
			alias: 'shapes',
			selector: '.scb-shapes',
		},
		shape: {
			fullSelector: ( uidClass, shapeClass ) =>
				`.${ uidClass } > .scb-shapes .${ shapeClass }`,
			alias: ( shapeId ) => `shape-${ shapeId }`,
			selector: '.scb-shape',
		},
		shapeSvg: {
			fullSelector: ( uidClass, shapeClass ) =>
				`.${ uidClass } > .scb-shapes .${ shapeClass }`,
			alias: ( shapeId ) => `shape-svg-${ shapeId }`,
			selector: '.scb-shape svg',
		},
	},
	heading: {
		main: {
			fullSelector: ( uidClass ) => `.${ uidClass }`,
			alias: 'main',
		},
		link: {
			fullSelector: ( uidClass ) => `.${ uidClass } a`,
			alias: 'link',
		},
		linkHover: {
			fullSelector: ( uidClass ) => `.${ uidClass } a:hover`,
			alias: 'linkHover',
		},
		highlightText: {
			fullSelector: ( uidClass ) => `.${ uidClass } mark`,
			alias: 'highlightText',
		},
		icon: {
			fullSelector: ( uidClass ) => `.${ uidClass } .scb-icon`,
			selector: '.scb-icon',
			alias: 'icon',
		},
		iconSvg: {
			fullSelector: ( uidClass ) => `.${ uidClass } .scb-icon svg`,
			alias: 'iconSvg',
		},
		text: {
			selector: '.scb-heading-text',
		},
	},
};
