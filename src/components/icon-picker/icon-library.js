/**
 * WordPress dependencies
 */
import {
	Modal,
	Button,
	RadioControl,
	TextControl,
	Spinner,
} from '@wordpress/components';
import { renderToString, useState, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';

/**
 * ScBlocks dependencies
 */
import { PLUGIN_NAME, STORE_NAME } from '@scblocks/constants';

/**
 * Internal dependencies
 */
import FontAwesomeIcon from './font-awesome-icon';
import Dashicon from './dashicon';

export const FONT_AWESOME_NAME = 'fontawesome';
export const DASHICON_NAME = 'dashicons';

function icon( iconPath, { dashicons, fontAwesome } ) {
	const iconPathParts = iconPath.split( '|' );
	switch ( iconPathParts[ 0 ] ) {
		case DASHICON_NAME: {
			return <Dashicon d={ dashicons[ iconPathParts[ 2 ] ] } />;
		}
		case FONT_AWESOME_NAME: {
			return (
				<FontAwesomeIcon
					iconAttr={
						fontAwesome[ iconPathParts[ 1 ] ][ iconPathParts[ 2 ] ]
					}
				/>
			);
		}
	}
}
function isIconNameInSearchValue( iconName, searchValue ) {
	return searchValue
		? iconName.toLowerCase().search( searchValue.toLowerCase() ) !== -1
		: true;
}
function filteredIconList( family, category, value, icons ) {
	const filteredList = [];

	if ( family === DASHICON_NAME ) {
		Object.keys( icons.dashicons ).forEach( ( name ) => {
			if ( isIconNameInSearchValue( name, value ) ) {
				filteredList.push(
					`${ DASHICON_NAME }|${ category }|${ name }`
				);
			}
		} );
		return filteredList;
	}
	if ( category === 'all' ) {
		Object.keys( icons.fontAwesome ).forEach( ( cat ) => {
			Object.keys( icons.fontAwesome[ cat ] ).forEach( ( name ) => {
				if ( isIconNameInSearchValue( name, value ) ) {
					filteredList.push(
						`${ FONT_AWESOME_NAME }|${ cat }|${ name }`
					);
				}
			} );
		} );
	} else {
		Object.keys( icons.fontAwesome[ category ] ).forEach( ( name ) => {
			if ( isIconNameInSearchValue( name, value ) ) {
				filteredList.push(
					`${ FONT_AWESOME_NAME }|${ category }|${ name }`
				);
			}
		} );
	}

	return filteredList;
}

export default function IconLibrary( { onSelectIcon, onRequestClose } ) {
	const { dashicons, fontAwesome } = useSelect( ( select ) => {
		return {
			dashicons: select( STORE_NAME ).getDashicons(),
			fontAwesome: select( STORE_NAME ).getFontAwesome(),
		};
	}, [] );
	const [ currentCategory, setCurrentCategory ] = useState( 'all' );
	const [ currentFamily, setCurrentFamily ] = useState( DASHICON_NAME );
	const [ currentIconPaths, setCurrentIconPaths ] = useState( '' );
	const [ searchValue, setSearchValue ] = useState( '' );

	const isLoaded = !! dashicons && !! fontAwesome;

	// show Dashicons in initial view
	useEffect( () => {
		if ( isLoaded ) {
			setCurrentIconPaths(
				filteredIconList( DASHICON_NAME, 'all', '', {
					dashicons,
					fontAwesome,
				} )
			);
		}
	}, [ isLoaded ] );

	function onSelect( path ) {
		onSelectIcon(
			path,
			renderToString( icon( path, { dashicons, fontAwesome } ) )
		);
	}
	function onChangeCategory( value ) {
		const [ family, category ] = value.split( '|' );

		setCurrentFamily( family );
		setCurrentCategory( category );
		setCurrentIconPaths(
			filteredIconList( family, category, searchValue, {
				dashicons,
				fontAwesome,
			} )
		);
	}

	return (
		<Modal
			title={ __( 'Icon Library', 'scblocks' ) }
			onRequestClose={ onRequestClose }
		>
			<div className={ `${ PLUGIN_NAME }-icon-library` }>
				<div className={ `${ PLUGIN_NAME }-icon-library-main` }>
					<div className={ `${ PLUGIN_NAME }-icon-library-search` }>
						<TextControl
							autoComplete="off"
							label={ __( 'Enter text to search for the icon' ) }
							value={ searchValue }
							onChange={ ( value ) => {
								setCurrentIconPaths(
									filteredIconList(
										currentFamily,
										currentCategory,
										value,
										{ fontAwesome, dashicons }
									)
								);
								setSearchValue( value );
							} }
						/>
					</div>
					<div className={ `${ PLUGIN_NAME }-icon-library-content` }>
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
								{ currentIconPaths.length > 0 ? (
									currentIconPaths.map( ( path ) => {
										const pathParts = path.split( '|' );
										return (
											<Button
												key={ path }
												isLarge
												onClick={ () =>
													onSelect( path )
												}
												showTooltip
												label={ pathParts[ 2 ] }
											>
												{ icon( path, {
													dashicons,
													fontAwesome,
												} ) }
												<span>{ pathParts[ 2 ] }</span>
											</Button>
										);
									} )
								) : (
									<p>
										{ __(
											'No results found.',
											'scblocks'
										) }
									</p>
								) }
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
									label: __( 'Dashicons', 'scblocks' ),
									value: `${ DASHICON_NAME }|all`,
								},
								{
									label: __(
										'Font Awesome - All',
										'scblocks'
									),
									value: `${ FONT_AWESOME_NAME }|all`,
								},
								{
									label: __(
										'Font Awesome - Regular',
										'scblocks'
									),
									value: `${ FONT_AWESOME_NAME }|regular`,
								},
								{
									label: __(
										'Font Awesome - Solid',
										'scblocks'
									),
									value: `${ FONT_AWESOME_NAME }|solid`,
								},
								{
									label: __(
										'Font Awesome - Brand',
										'scblocks'
									),
									value: `${ FONT_AWESOME_NAME }|brand`,
								},
							] }
							onChange={ ( value ) => onChangeCategory( value ) }
						/>
					) }
				</div>
			</div>
		</Modal>
	);
}
