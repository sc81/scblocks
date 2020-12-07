/**
 * External dependencies
 */
import { produce } from 'immer';
import { isEmpty } from 'lodash';

function setSelectorInitialStateIfAny( css, devices, selector ) {
	if ( ! css[ devices ] ) {
		css[ devices ] = {};
	}
	if ( ! css[ devices ][ selector ] ) {
		css[ devices ][ selector ] = [];
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
	if ( attributes.css[ devices ] && attributes.css[ devices ][ selector ] ) {
		const selectorProps = attributes.css[ devices ][ selector ];
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

export function getPropsForEveryDevice( props ) {
	const properties = {};
	for ( const devices in props.attributes.css ) {
		properties[ devices ] = getPropertiesValue( { ...props, devices } );
	}
	return properties;
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
	const index = getPropIndex( selectorState, propName );

	if ( index > -1 ) {
		selectorState[ index ] = `${ propName }:${ value }`;
	} else {
		selectorState.push( `${ propName }:${ value }` );
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
		getPropIndex( attributes.css[ devices ][ selector ], propName ) === -1
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
	const index = getPropIndex( selectorState, propName );
	if ( index > -1 ) {
		selectorState.splice( index, 1 );
	}
}

export function setPropsForVariousDevices( {
	selector,
	attributes,
	setAttributes,
	props = null,
	everyDeviceProps = null,
} ) {
	const css = produce( attributes.css, ( draft ) => {
		if ( everyDeviceProps ) {
			for ( const devices in draft ) {
				setSelectorInitialStateIfAny( draft, devices, selector );
				for ( const prop in everyDeviceProps ) {
					if ( everyDeviceProps[ prop ] ) {
						setProp(
							draft[ devices ][ selector ],
							prop,
							everyDeviceProps[ prop ]
						);
					} else {
						removeProp( draft[ devices ][ selector ], prop );
					}
				}
				removeParentsIfAny( draft, devices, selector );
			}
		}
		for ( const devices in props ) {
			setSelectorInitialStateIfAny( draft, devices, selector );
			for ( const prop in props[ devices ] ) {
				if ( props[ devices ][ prop ] ) {
					setProp(
						draft[ devices ][ selector ],
						prop,
						props[ devices ][ prop ]
					);
				} else {
					removeProp( draft[ devices ][ selector ], prop );
				}
			}
			removeParentsIfAny( draft, devices, selector );
		}
	} );

	setAttributes( { css } );
}
export function setPropsValue( {
	selector,
	devices,
	attributes,
	setAttributes,
	props,
} ) {
	const css = produce( attributes.css, ( draft ) => {
		setSelectorInitialStateIfAny( draft, devices, selector );

		for ( const prop in props ) {
			if ( props[ prop ] ) {
				setProp( draft[ devices ][ selector ], prop, props[ prop ] );
			} else {
				removeProp( draft[ devices ][ selector ], prop );
			}
		}
		removeParentsIfAny( draft, devices, selector );
	} );

	setAttributes( { css } );
}
export function setPropsForVariousSelectors( {
	attributes,
	setAttributes,
	devices,
	props = null,
} ) {
	const css = produce( attributes.css, ( draft ) => {
		for ( const selector in props ) {
			setSelectorInitialStateIfAny( draft, devices, selector );

			for ( const prop in props[ selector ] ) {
				if ( props[ selector ][ prop ] ) {
					setProp(
						draft[ devices ][ selector ],
						prop,
						props[ selector ][ prop ]
					);
				} else {
					removeProp( draft[ devices ][ selector ], prop );
				}
			}
			removeParentsIfAny( draft, devices, selector );
		}
	} );

	setAttributes( { css } );
}

export function removeSelectors( {
	selectors,
	devices,
	attributes,
	setAttributes,
} ) {
	const css = produce( attributes.css, ( draft ) => {
		if ( devices ) {
			selectors.forEach( ( selector ) => {
				delete draft[ devices ][ selector ];
				delete draft[ devices ][ selector + ':hover' ];
			} );
			if ( isEmpty( draft[ devices ] ) ) {
				delete draft[ devices ];
			}
		} else {
			for ( const d in draft ) {
				selectors.forEach( ( selector ) => {
					delete draft[ d ][ selector ];
					delete draft[ d ][ selector + ':hover' ];
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
	if ( ! css[ devices ][ selector ].length ) {
		delete css[ devices ][ selector ];
	}
	if ( isEmpty( css[ devices ] ) ) {
		delete css[ devices ];
	}
}
