export const SELEKTORY = {
	button: {
		main: {
			blockSelector: ( uidClass ) => `.${ uidClass }`,
			alias: 'main',
		},
		mainHover: {
			blockSelector: ( uidClass ) => `.${ uidClass }:hover`,
			alias: 'mainHover',
		},
		text: {
			selector: '.scb-button-text',
		},
		icon: {
			selector: '.scb-icon',
			blockSelector: ( uidClass ) => `.${ uidClass } .scb-icon`,
			alias: 'icon',
		},
		iconSvg: {
			blockSelector: ( uidClass ) => `.${ uidClass } .scb-icon svg`,
			alias: 'iconSvg',
		},
	},
	buttons: {
		main: {
			blockSelector: ( uidClass ) => `.${ uidClass }`,
			alias: 'main',
		},
		button: {
			blockSelector: ( uidClass ) => `.${ uidClass } .scb-button`,
			alias: 'button',
		},
		buttonHover: {
			blockSelector: ( uidClass ) => `.${ uidClass } .scb-button:hover`,
			alias: 'buttonHover',
		},
		icon: {
			blockSelector: ( uidClass ) => `.${ uidClass } .scb-icon`,
			alias: 'icon',
		},
	},
	column: {
		main: {
			blockSelector: ( uidClass ) => `.${ uidClass }`,
			alias: 'main',
		},
		link: {
			blockSelector: ( uidClass ) => `.${ uidClass } a`,
			alias: 'link',
		},
		linkHover: {
			blockSelector: ( uidClass ) => `.${ uidClass } a:hover`,
			alias: 'linkHover',
		},
	},
	columns: {
		main: {
			blockSelector: ( uidClass ) => `.${ uidClass }`,
			alias: 'main',
		},
		column: {
			blockSelector: ( uidClass ) => `.${ uidClass } > .scb-column`,
			alias: 'column',
		},
	},
	container: {
		main: {
			blockSelector: ( uidClass ) => `.${ uidClass }`,
			alias: 'main',
		},
		mainStronger: {
			blockSelector: ( uidClass ) => `.scb-container.${ uidClass }`,
			alias: 'mainStronger',
		},
		content: {
			blockSelector: ( uidClass ) =>
				`.${ uidClass } > .scb-container-content`,
			alias: 'content',
		},
		link: {
			blockSelector: ( uidClass ) => `.${ uidClass } a`,
			alias: 'link',
		},
		linkHover: {
			blockSelector: ( uidClass ) => `.${ uidClass } a:hover`,
			alias: 'linkHover',
		},
		shapes: {
			blockSelector: ( uidClass ) => `.${ uidClass } > .scb-shapes`,
			alias: 'shapes',
			selector: '.scb-shapes',
		},
		shape: {
			blockSelector: ( uidClass, shapeClass ) =>
				`.${ uidClass } > .scb-shapes .${ shapeClass }`,
			alias: ( shapeId ) => `shape-${ shapeId }`,
			selector: '.scb-shape',
		},
		shapeSvg: {
			blockSelector: ( uidClass, shapeClass ) =>
				`.${ uidClass } > .scb-shapes .${ shapeClass }`,
			alias: ( shapeId ) => `shape-svg-${ shapeId }`,
			selector: '.scb-shape svg',
		},
	},
	heading: {
		main: {
			blockSelector: ( uidClass ) => `.${ uidClass }`,
			alias: 'main',
		},
		link: {
			blockSelector: ( uidClass ) => `.${ uidClass } a`,
			alias: 'link',
		},
		linkHover: {
			blockSelector: ( uidClass ) => `.${ uidClass } a:hover`,
			alias: 'linkHover',
		},
		highlightText: {
			blockSelector: ( uidClass ) => `.${ uidClass } mark`,
			alias: 'highlightText',
		},
		icon: {
			blockSelector: ( uidClass ) => `.${ uidClass } .scb-icon`,
			selector: '.scb-icon',
			alias: 'icon',
		},
		iconSvg: {
			blockSelector: ( uidClass ) => `.${ uidClass } .scb-icon svg`,
			alias: 'iconSvg',
		},
		text: {
			selector: '.scb-heading-text',
		},
	},
};
