export const SHARED_ATTRIBUTES = {
	required: {
		css: {
			type: 'object',
			default: {},
		},
		uidClass: {
			type: 'string',
			default: '',
		},
	},
	googleFonts: {
		fontFamily: {
			type: 'string',
			default: '',
		},
		fontFamilyFallback: {
			type: 'string',
			default: '',
		},
		googleFont: {
			type: 'boolean',
			default: false,
		},
		googleFontVariants: {
			type: 'string',
			default: '',
		},
	},
	id: {
		elementId: {
			type: 'string',
			default: '',
		},
	},
	classes: {
		cssClasses: {
			type: 'string',
			default: '',
		},
	},
};
