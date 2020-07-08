/**
 * External dependencies
 */
import { produce } from 'immer';
import { isEmpty } from 'lodash';

function setSelectorInitialStateIfAny( css, devices, selector, initSettings ) {
	if ( ! css[ devices ] ) {
		css[ devices ] = {};
	}
	if ( ! css[ devices ][ selector ] ) {
		css[ devices ][ selector ] = {};
	}
	if ( ! css[ devices ][ selector ].props ) {
		css[ devices ][ selector ].props = [];
	}
	if ( initSettings && ! css[ devices ][ selector ].settings ) {
		css[ devices ][ selector ].settings = {};
	}
}

function getPropIndex( props, propName ) {
	return props.findIndex( ( prop ) =>
		new RegExp( `^${ propName }:` ).test( prop )
	);
}
function extractValue( text ) {
	return text.slice( text.indexOf( ':' ) + 1 );
}

export function getPropValue( { attributes, devices, selector, propName } ) {
	if (
		attributes.css[ devices ] &&
		attributes.css[ devices ][ selector ] &&
		attributes.css[ devices ][ selector ].props
	) {
		const selectorProps = attributes.css[ devices ][ selector ].props;
		const index = getPropIndex( selectorProps, propName );

		return index > -1 ? extractValue( selectorProps[ index ] ) : '';
	}
	return '';
}

export function getPropertiesValue( obj ) {
	const props = {};
	obj.props.forEach( ( prop ) => {
		props[ prop ] = getPropValue( { ...obj, propName: prop } );
	} );
	return props;
}
export function getSelectorPropsSettings( props ) {
	return {
		properties: getPropertiesValue( props ),
		settings: getSelectorSettings( props ),
	};
}
export function getSelectorPropsSettingsForAllDevices( props ) {
	const properties = {};
	const settingsObj = {};
	for ( const devices in props.attributes.css ) {
		properties[ devices ] = getPropertiesValue( props );
		settingsObj[ devices ] = getSelectorSettings( props );
	}
	return { properties, settings: settingsObj };
}
export function getSelectorSettings( props ) {
	const obj = {};
	props.settings.forEach( ( propName ) => {
		obj[ propName ] = getSelectorSetting( { ...props, propName } );
	} );
	return obj;
}
export function getSelectorSetting( {
	attributes,
	devices,
	selector,
	propName,
} ) {
	if (
		! attributes.css[ devices ] ||
		! attributes.css[ devices ][ selector ] ||
		! attributes.css[ devices ][ selector ].settings ||
		! attributes.css[ devices ][ selector ].settings[ propName ]
	) {
		return null;
	}
	const setting = attributes.css[ devices ][ selector ].settings[ propName ];
	if (
		typeof setting === 'string' ||
		typeof setting === 'number' ||
		typeof setting === 'boolean'
	) {
		return setting;
	}
	if ( Array.isArray( setting ) ) {
		return [ ...setting ];
	}
	return { ...setting };
}

export function setPropValue( {
	selector,
	devices,
	propName,
	attributes,
	setAttributes,
	value,
} ) {
	if ( ! value ) {
		removeProperty( {
			selector,
			devices,
			propName,
			attributes,
			setAttributes,
		} );
		return;
	}
	const css = produce( attributes.css, ( draft ) => {
		setSelectorInitialStateIfAny( draft, devices, selector );
		setProp( draft[ devices ][ selector ], propName, value );
	} );
	setAttributes( { css } );
}

function setProp( selectorState, propName, value ) {
	const index = getPropIndex( selectorState.props, propName );

	if ( index > -1 ) {
		selectorState.props[ index ] = `${ propName }:${ value }`;
	} else {
		selectorState.props.push( `${ propName }:${ value }` );
	}
}
function removeProperty( {
	selector,
	devices,
	propName,
	attributes,
	setAttributes,
} ) {
	if (
		! attributes.css[ devices ] ||
		! attributes.css[ devices ][ selector ] ||
		! attributes.css[ devices ][ selector ].props ||
		getPropIndex(
			attributes.css[ devices ][ selector ].props,
			propName
		) === -1
	) {
		return;
	}
	const css = produce( attributes.css, ( draft ) => {
		removeProp( draft[ devices ][ selector ], propName );
		removeParentsIfAny( draft, devices, selector );
	} );

	setAttributes( { css } );
}
function removeProp( selectorState, propName ) {
	const index = getPropIndex( selectorState.props, propName );
	if ( index > -1 ) {
		selectorState.props.splice( index, 1 );
		removeSettingIfAny( selectorState.settings, propName );
	}
}

function removeSettingIfAny( settings, prop ) {
	if ( settings ) {
		delete settings[ prop ];
	}
}

export function removePropsAndSettings( {
	selector,
	devices,
	attributes,
	setAttributes,
	props,
	settings,
} ) {
	if (
		! attributes.css[ devices ] ||
		! attributes.css[ devices ][ selector ] ||
		! attributes.css[ devices ][ selector ].props
	) {
		return;
	}
	const css = produce( attributes.css, ( draft ) => {
		if ( props ) {
			const selectorProps = draft[ devices ][ selector ].props;
			let index;
			props.forEach( ( prop ) => {
				index = getPropIndex( selectorProps, prop );
				if ( index > -1 ) {
					selectorProps.splice( index, 1 );
				}
			} );
		}
		if ( settings ) {
			settings.forEach( ( s ) =>
				removeSettingIfAny( draft[ devices ][ selector ].settings, s )
			);
		}

		removeParentsIfAny( draft, devices, selector );
	} );

	setAttributes( { css } );
}
export function setSelectorsPropsSettingsForVariousMedia( {
	attributes,
	setAttributes,
	mediaObj = null,
	allMediaProps = null,
	allMediaSettings = null,
} ) {
	const css = produce( attributes.css, ( draft ) => {
		for ( const devices in mediaObj ) {
			if ( devices.selectors ) {
				for ( const selector in mediaObj[ devices ].selectors ) {
					setSelectorInitialStateIfAny( draft, devices, selector );
					for ( const prop in mediaObj[ devices ].selectors[
						selector
					] ) {
						if (
							mediaObj[ devices ].selectors[ selector ][ prop ]
						) {
							setProp(
								draft[ devices ][ selector ],
								prop,
								mediaObj[ devices ].selectors[ selector ][
									prop
								]
							);
						} else {
							removeProp( draft[ devices ][ selector ], prop );
						}
					}
					removeParentsIfAny( draft, devices, selector );
				}
			}
			if ( devices.settings ) {
				for ( const selector in mediaObj[ devices ].settings ) {
					setSelectorInitialStateIfAny(
						draft,
						devices,
						selector,
						true
					);
					for ( const setting in mediaObj[ devices ].settings[
						selector
					] ) {
						if (
							mediaObj[ devices ].settings[ selector ][ setting ]
						) {
							draft[ devices ][ selector ].settings[ setting ] =
								mediaObj[ devices ].settings[ selector ][
									setting
								];
						} else {
							delete draft[ devices ][ selector ].settings[
								setting
							];
						}
					}
					removeParentsIfAny( draft, devices, selector );
				}
			}
		}
		if ( allMediaProps ) {
			for ( const devices in draft ) {
				for ( const selector in allMediaProps ) {
					setSelectorInitialStateIfAny( draft, devices, selector );
					for ( const prop in allMediaProps[ selector ] ) {
						if ( allMediaProps[ selector ][ prop ] ) {
							setProp(
								draft[ devices ][ selector ],
								prop,
								allMediaProps[ selector ][ prop ]
							);
						} else {
							removeProp( draft[ devices ][ selector ], prop );
						}
					}
					removeParentsIfAny( draft, devices, selector );
				}
			}
		}
		if ( allMediaSettings ) {
			for ( const devices in draft ) {
				for ( const selector in allMediaSettings ) {
					setSelectorInitialStateIfAny(
						draft,
						devices,
						selector,
						true
					);
					for ( const setting in allMediaSettings[ selector ] ) {
						if ( allMediaSettings[ selector ][ setting ] ) {
							draft[ devices ][ selector ].settings[ setting ] =
								allMediaSettings[ selector ][ setting ];
						} else {
							delete draft[ devices ][ selector ].settings[
								setting
							];
						}
					}
					removeParentsIfAny( draft, devices, selector );
				}
			}
		}
	} );

	setAttributes( { css } );
}
export function setPropsSettingsForVariousMedia( {
	selector,
	attributes,
	setAttributes,
	mediaProps = null,
	mediaSettings = null,
	allMediaProps = null,
	allMediaSettings = null,
} ) {
	const css = produce( attributes.css, ( draft ) => {
		for ( const devices in mediaProps ) {
			setSelectorInitialStateIfAny( draft, devices, selector );
			for ( const prop in mediaProps[ devices ] ) {
				if ( mediaProps[ devices ][ prop ] ) {
					setProp(
						draft[ devices ][ selector ],
						prop,
						mediaProps[ devices ][ prop ]
					);
				} else {
					removeProp( draft[ devices ][ selector ], prop );
				}
			}
			removeParentsIfAny( draft, devices, selector );
		}
		for ( const m in mediaSettings ) {
			setSelectorInitialStateIfAny( draft, m, selector, true );

			for ( const setting in mediaSettings[ m ] ) {
				if ( ! isEmpty( mediaSettings[ m ][ setting ] ) ) {
					draft[ m ][ selector ].settings[ setting ] =
						mediaSettings[ m ][ setting ];
				} else {
					delete draft[ m ][ selector ].settings[ setting ];
				}
			}
			removeParentsIfAny( draft, m, selector );
		}
		if ( allMediaProps ) {
			for ( const devices in draft ) {
				setSelectorInitialStateIfAny( draft, devices, selector );
				for ( const prop in allMediaProps ) {
					if ( allMediaProps[ prop ] ) {
						setProp(
							draft[ devices ][ selector ],
							prop,
							allMediaProps[ prop ]
						);
					} else {
						removeProp( draft[ devices ][ selector ], prop );
					}
				}
				removeParentsIfAny( draft, devices, selector );
			}
		}
		if ( allMediaSettings ) {
			for ( const devices in draft ) {
				setSelectorInitialStateIfAny( draft, devices, selector, true );
				for ( const setting in allMediaSettings ) {
					if ( allMediaSettings[ setting ] ) {
						draft[ devices ][ selector ].settings[ setting ] =
							allMediaSettings[ setting ];
					} else {
						delete draft[ devices ][ selector ].settings[ setting ];
					}
				}
				removeParentsIfAny( draft, devices, selector );
			}
		}
	} );

	setAttributes( { css } );
}
export function setPropsAndSettings( {
	selector,
	devices,
	attributes,
	setAttributes,
	props,
	settings = null,
} ) {
	const css = produce( attributes.css, ( draft ) => {
		setSelectorInitialStateIfAny( draft, devices, selector, true );

		for ( const prop in props ) {
			if ( props[ prop ] ) {
				setProp( draft[ devices ][ selector ], prop, props[ prop ] );
			} else {
				removeProp( draft[ devices ][ selector ], prop );
			}
		}
		for ( const s in settings ) {
			if ( settings[ s ] ) {
				draft[ devices ][ selector ].settings[ s ] = settings[ s ];
			} else {
				delete draft[ devices ][ selector ].settings[ s ];
			}
		}
		removeParentsIfAny( draft, devices, selector );
	} );

	setAttributes( { css } );
}
export function setPropsSettingsForVariousSelectors( {
	attributes,
	setAttributes,
	devices,
	selectorsProps = null,
	selectorsSettings = null,
} ) {
	const css = produce( attributes.css, ( draft ) => {
		for ( const selector in selectorsProps ) {
			setSelectorInitialStateIfAny( draft, devices, selector );

			for ( const prop in selectorsProps[ selector ] ) {
				if ( selectorsProps[ selector ][ prop ] ) {
					setProp(
						draft[ devices ][ selector ],
						prop,
						selectorsProps[ selector ][ prop ]
					);
				} else {
					removeProp( draft[ devices ][ selector ], prop );
				}
			}
			removeParentsIfAny( draft, devices, selector );
		}
		for ( const selector in selectorsSettings ) {
			setSelectorInitialStateIfAny( draft, devices, selector, true );

			for ( const prop in selectorsSettings[ selector ] ) {
				if ( selectorsSettings[ selector ][ prop ] ) {
					draft[ devices ][ selector ].settings[ prop ] =
						selectorsSettings[ selector ][ prop ];
				} else {
					delete draft[ devices ][ selector ].settings[ prop ];
				}
			}

			removeParentsIfAny( draft, devices, selector );
		}
	} );

	setAttributes( { css } );
}
export function setSelectorSettings( {
	selector,
	devices,
	attributes,
	setAttributes,
	propName,
	value,
} ) {
	if ( ! value ) {
		removeSelectorSettings( {
			selector,
			devices,
			propName,
			attributes,
			setAttributes,
		} );
		return;
	}
	const css = produce( attributes.css, ( draft ) => {
		setSelectorInitialStateIfAny( draft, devices, selector, true );

		draft[ devices ][ selector ].settings[ propName ] = value;
	} );

	setAttributes( { css } );
}
function removeSelectorSettings( {
	selector,
	devices,
	propName,
	attributes,
	setAttributes,
} ) {
	if (
		! attributes.css[ devices ] ||
		! attributes.css[ devices ][ selector ] ||
		! attributes.css[ devices ][ selector ].settings ||
		! attributes.css[ devices ][ selector ].settings[ propName ]
	) {
		return;
	}
	const css = produce( attributes.css, ( draft ) => {
		delete draft[ devices ][ selector ].settings[ propName ];

		removeParentsIfAny( draft, devices, selector );
	} );

	setAttributes( { css } );
}
export function removeSelector( {
	selector,
	devices,
	attributes,
	setAttributes,
} ) {
	const css = produce( attributes.css, ( draft ) => {
		if ( devices ) {
			delete draft[ devices ][ selector ];
			if ( isEmpty( draft[ devices ] ) ) {
				delete draft[ devices ];
			}
		} else {
			for ( const d in draft ) {
				delete draft[ d ][ selector ];
				if ( isEmpty( draft[ d ] ) ) {
					delete draft[ d ];
				}
			}
		}
	} );

	setAttributes( { css } );
}
export function removeSelectors( {
	selectors,
	devices,
	attributes,
	setAttributes,
	removeHoverSelector,
} ) {
	const css = produce( attributes.css, ( draft ) => {
		if ( devices ) {
			selectors.forEach( ( selector ) => {
				delete draft[ devices ][ selector ];
				if ( removeHoverSelector ) {
					delete draft[ devices ][ selector + ':hover' ];
				}
			} );
			if ( isEmpty( draft[ devices ] ) ) {
				delete draft[ devices ];
			}
		} else {
			for ( const d in draft ) {
				selectors.forEach( ( selector ) => {
					delete draft[ d ][ selector ];
					if ( removeHoverSelector ) {
						delete draft[ d ][ selector + ':hover' ];
					}
				} );
				if ( isEmpty( draft[ d ] ) ) {
					delete draft[ d ];
				}
			}
		}
	} );

	setAttributes( { css } );
}
function removeParentsIfAny( css, devices, selector ) {
	if ( isEmpty( css[ devices ][ selector ].settings ) ) {
		delete css[ devices ][ selector ].settings;
	}
	if ( ! css[ devices ][ selector ].props.length ) {
		delete css[ devices ][ selector ].props;
	}
	if ( isEmpty( css[ devices ][ selector ] ) ) {
		delete css[ devices ][ selector ];
	}
	if ( isEmpty( css[ devices ] ) ) {
		delete css[ devices ];
	}
}
