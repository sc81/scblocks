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
		htmlId: {
			type: 'string',
			default: '',
		},
	},
	classes: {
		htmlClass: {
			type: 'string',
			default: '',
		},
	},
	// deprecated since 1.3.0
	bgImageIds: {
		backgroundImageIds: {
			type: 'object',
			default: '',
		},
	},
	icon: {
		iconName: {
			type: 'string',
			default: '',
		},
		iconId: {
			type: 'string',
			default: '',
		},
		iconHtml: {
			type: 'string',
			default: '',
		},
		iconPostId: {
			type: 'string',
			default: '',
		},
	},
};
