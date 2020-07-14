/**
 * External dependencies
 */
import { isEmpty } from 'lodash';
/**
 * WordPress dependencies
 */
import {
	Modal,
	Button,
	RadioControl,
	TextControl,
	Dashicon,
	Spinner,
} from '@wordpress/components';
import { Component, renderToString } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { PLUGIN_NAME } from '../../constants';
import FontAwesomeIcon from './font-awesome-icon';
import {
	icons,
	iconsCategories,
	DASHICON_NAME,
	FONT_AWESOME_NAME,
} from './utils';

let isLocked = false;

export default class IconLibrary extends Component {
	constructor( props ) {
		super( props );
		this.state = this.initState();
	}
	initState() {
		const { iconPath } = this.props;

		const parts = iconPath
			? iconPath.split( '/' )
			: [ DASHICON_NAME, 'all', '' ];

		const currentFamily = parts[ 0 ];
		const currentCategory = parts[ 1 ];
		let currentIconPaths;

		if (
			currentFamily === DASHICON_NAME ||
			( currentFamily === FONT_AWESOME_NAME &&
				isEmpty( icons[ FONT_AWESOME_NAME ] ) )
		) {
			currentIconPaths = icons[ DASHICON_NAME ].map(
				( name ) => `${ DASHICON_NAME }/all/${ name }`
			);
		} else {
			currentIconPaths = Object.keys(
				icons[ currentFamily ][ currentCategory ]
			).map( ( name ) => {
				return `${ currentFamily }/${ currentCategory }/${ name }`;
			} );
		}

		return {
			currentFamily,
			currentCategory,
			currentIconPaths,
			searchValue: '',
			isLoaded: false,
		};
	}
	componentDidMount() {
		this.componentExist = true;
		if ( isLocked ) {
			return;
		}
		if ( isEmpty( icons[ FONT_AWESOME_NAME ] ) ) {
			isLocked = true;

			apiFetch( {
				path: `/${ PLUGIN_NAME }/v1/icons/1`,
			} )
				.then( ( resp ) => {
					icons[ FONT_AWESOME_NAME ] = JSON.parse( resp );
					iconsCategories[ FONT_AWESOME_NAME ] = Object.keys(
						icons[ FONT_AWESOME_NAME ]
					);

					isLocked = false;
					if ( this.componentExist ) {
						this.setState( {
							isLoaded: true,
						} );
					}
				} )
				.catch( () => {
					isLocked = false;
					if ( this.componentExist ) {
						this.setState( {
							isLoaded: true,
						} );
					}
				} );
		} else {
			this.setState( {
				isLoaded: true,
			} );
		}
	}
	componentWillUnmount() {
		this.componentExist = false;
	}
	filterIconList( family, category, value ) {
		const filterdList = [];

		function condition( iconName, searchValue ) {
			return searchValue
				? iconName.toLowerCase().search( searchValue.toLowerCase() ) !==
						-1
				: true;
		}

		if ( family === DASHICON_NAME ) {
			icons[ DASHICON_NAME ].forEach( ( name ) => {
				if ( condition( name, value ) ) {
					filterdList.push(
						`${ DASHICON_NAME }/${ category }/${ name }`
					);
				}
			} );
		} else if ( category === 'all' ) {
			iconsCategories[ family ].forEach( ( cat ) => {
				Object.keys( icons[ family ][ cat ] ).forEach( ( name ) => {
					if ( condition( name, value ) ) {
						filterdList.push( `${ family }/${ cat }/${ name }` );
					}
				} );
			} );
		} else {
			Object.keys( icons[ family ][ category ] ).forEach( ( name ) => {
				if ( condition( name, value ) ) {
					filterdList.push( `${ family }/${ category }/${ name }` );
				}
			} );
		}

		this.setState( {
			currentIconPaths: filterdList,
			searchValue: value,
		} );
	}
	icon( iconPathParts ) {
		switch ( iconPathParts[ 0 ] ) {
			case DASHICON_NAME: {
				return <Dashicon icon={ iconPathParts[ 2 ] } />;
			}
			case FONT_AWESOME_NAME: {
				return (
					<FontAwesomeIcon
						iconAttr={
							icons[ FONT_AWESOME_NAME ][ iconPathParts[ 1 ] ][
								iconPathParts[ 2 ]
							]
						}
					/>
				);
			}
		}
	}
	onSelectIcon( path ) {
		const icon = renderToString( this.icon( path.split( '/' ) ) );
		this.props.onSelectIcon( path, icon );
	}

	iconList() {
		const { currentIconPaths } = this.state;
		let pathParts;
		return currentIconPaths.length > 0 ? (
			currentIconPaths.map( ( path ) => {
				pathParts = path.split( '/' );
				return (
					<Button
						key={ path }
						isLarge
						onClick={ () => this.onSelectIcon( path ) }
						showTooltip
						label={ pathParts[ 2 ] }
					>
						{ this.icon( pathParts ) }
						<span>{ pathParts[ 2 ] }</span>
					</Button>
				);
			} )
		) : (
			<p>{ __( 'No results found.' ) }</p>
		);
	}

	onChangeCategory( value ) {
		const [ family, category ] = value.split( '|' );
		this.setState( {
			currentFamily: family,
			currentCategory: category,
		} );
		this.filterIconList( family, category, this.state.searchValue );
	}

	render() {
		const { onRequestClose } = this.props;
		const {
			currentFamily,
			currentCategory,
			searchValue,
			isLoaded,
		} = this.state;

		return (
			<Modal
				title={ __( 'Icon Library' ) }
				onRequestClose={ onRequestClose }
			>
				<div className={ `${ PLUGIN_NAME }-icon-library` }>
					<div className={ `${ PLUGIN_NAME }-icon-library-main` }>
						<div
							className={ `${ PLUGIN_NAME }-icon-library-search` }
						>
							<TextControl
								autoComplete="off"
								label={ __(
									'Enter text to search for the icon'
								) }
								value={ searchValue }
								onChange={ ( value ) =>
									this.filterIconList(
										currentFamily,
										currentCategory,
										value
									)
								}
							/>
						</div>
						<div
							className={ `${ PLUGIN_NAME }-icon-library-content` }
						>
							{ ! isLoaded && (
								<div
									className={ `${ PLUGIN_NAME }-icon-library-spinner` }
								>
									<Spinner />
								</div>
							) }
							{ isLoaded && (
								<div
									className={ `${ PLUGIN_NAME }-icon-library-list` }
								>
									{ this.iconList() }
								</div>
							) }
						</div>
					</div>
					<div className={ `${ PLUGIN_NAME }-icon-library-sidebar` }>
						{ ! isLoaded && (
							<div
								className={ `${ PLUGIN_NAME }-icon-library-spinner` }
							>
								<Spinner />
							</div>
						) }
						{ isLoaded && (
							<RadioControl
								className={ `${ PLUGIN_NAME }-icon-library-categories` }
								selected={ `${ currentFamily }|${ currentCategory }` }
								options={ [
									{
										label: __( 'Dashicons' ),
										value: `${ DASHICON_NAME }|all`,
									},
									{
										label: __( 'Font Awesome - All' ),
										value: `${ FONT_AWESOME_NAME }|all`,
									},
									{
										label: __( 'Font Awesome - Regular' ),
										value: `${ FONT_AWESOME_NAME }|regular`,
									},
									{
										label: __( 'Font Awesome - Solid' ),
										value: `${ FONT_AWESOME_NAME }|solid`,
									},
									{
										label: __( 'Font Awesome - Brand' ),
										value: `${ FONT_AWESOME_NAME }|brand`,
									},
								] }
								onChange={ ( value ) =>
									this.onChangeCategory( value )
								}
							/>
						) }
					</div>
				</div>
			</Modal>
		);
	}
}
