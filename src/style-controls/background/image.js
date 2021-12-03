/**
 * External dependencies
 */
import { isEmpty, get, cloneDeep } from 'lodash';

/**
 * WordPress dependencies
 */
import { Button, TextControl, SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { useEffect, useMemo } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { applyFilters } from '@wordpress/hooks';

/**
 * ScBlocks dependencies
 */
import { getPropValue, setPropsValue } from '@scblocks/css-utils';
import { ControlWrapper } from '@scblocks/components';
import { STORE_NAME } from '@scblocks/constants';

/**
 * Internal dependencies
 */
import { names } from './constants';
import Position from './position';
import Size from './size';
import Repeat from './repeat';
import Attachment from './attachment';
import retriveUrl from './utils';

const propName = names.image;

export default function Image( props ) {
	const { attributes, setAttributes, devices, selector } = props;
	const { bgImage = {}, backgroundImageIds } = attributes;

	const idFromDeprecatedAttr = backgroundImageIds
		? get( backgroundImageIds, [ devices ], -1 )
		: -1;
	const id = get( bgImage, [ devices, 'id' ], idFromDeprecatedAttr );
	const imageSize = get( bgImage, [ devices, 'size' ], 'full' );

	const imageUrls = useSelect(
		( select ) => select( STORE_NAME ).imageUrls( id ),
		[ id ]
	);
	const imageSizes = useMemo( () => {
		if ( isEmpty( imageUrls ) ) {
			return;
		}
		const allowedSizes = applyFilters(
			'scblocks.backgroundImage.allowedSizes',
			[ 'full', 'large', 'medium', 'thumbnail' ]
		);
		let sizes = Object.keys( imageUrls );
		if ( allowedSizes ) {
			sizes = sizes.filter( ( name ) => allowedSizes.includes( name ) );
		}
		return sizes
			.sort()
			.reverse()
			.map( ( value ) => {
				return {
					value,
					label: value,
				};
			} );
	}, [ imageUrls ] );

	const backgroundImageProp = getPropValue( {
		attributes,
		devices,
		selector,
		propName,
	} );
	const url = retriveUrl( backgroundImageProp );

	const isExternalImage = id === -1 && url;

	// migrating from deprecated backgroundImageIds
	useEffect( () => {
		if ( backgroundImageIds && url ) {
			setImage( {
				id,
				size: imageSize,
				url,
			} );
			setAttributes( { backgroundImageIds: '' } );
		}
	}, [] );

	function setImage( image ) {
		const nextUrl = `url(${ image.url })`;

		setPropsValue( {
			selector,
			devices,
			attributes,
			setAttributes,
			props: {
				backgroundImage: nextUrl,
			},
		} );
		const nextBgImage = {
			...bgImage,
			[ devices ]: {
				id: image.id,
				size: image.size,
			},
		};
		setAttributes( {
			bgImage: nextBgImage,
		} );
	}

	function onSelectImage( media ) {
		if ( ! media || ! media.url ) {
			return;
		}
		let size = imageSize;
		if ( 'undefined' === typeof media.sizes[ size ] ) {
			size = 'full';
		}

		setImage( {
			id: media.id,
			size,
			url: media.sizes[ size ].url,
		} );
	}
	function removeImage() {
		setPropsValue( {
			attributes,
			setAttributes,
			devices,
			selector,
			props: {
				backgroundAttachment: '',
				backgroundPosition: '',
				backgroundRepeat: '',
				backgroundSize: '',
				backgroundImage: '',
			},
		} );
		let nextBgImage = cloneDeep( bgImage );
		delete nextBgImage[ devices ];
		if ( isEmpty( nextBgImage ) ) {
			nextBgImage = '';
		}
		setAttributes( {
			bgImage: nextBgImage,
		} );
	}
	function onChangeUrl( value ) {
		if ( value ) {
			setImage( {
				id: -1,
				size: 'full',
				url: value,
			} );
		} else {
			removeImage();
		}
	}

	return (
		<>
			<ControlWrapper label={ __( 'Image', 'scblocks' ) } displayInline>
				<div className="scblocks-inline-buttons">
					<MediaUploadCheck>
						<MediaUpload
							onSelect={ onSelectImage }
							allowedTypes={ [ 'image' ] }
							value={ id }
							render={ ( { open } ) => (
								<Button
									isSecondary
									isSmall
									className="editor-media-placeholder__button block-editor-media-placeholder__button"
									onClick={ open }
								>
									{ __( 'Media Library', 'scblocks' ) }
								</Button>
							) }
						/>
					</MediaUploadCheck>
					{ url && (
						<Button
							isSecondary
							isSmall
							onClick={ () => removeImage() }
						>
							{ __( 'Remove', 'scblocks' ) }
						</Button>
					) }
				</div>
			</ControlWrapper>
			<TextControl
				label={ __( 'Image URL', 'scblocks' ) }
				value={ url }
				onChange={ onChangeUrl }
				autocomplete="off"
			/>
			{ ! isExternalImage && url && imageSizes && (
				<SelectControl
					label={ __( 'Image Size', 'scblocks' ) }
					value={ imageSize }
					options={ imageSizes }
					onChange={ ( value ) => {
						setImage( {
							id,
							size: value,
							url: imageUrls[ value ],
						} );
					} }
				/>
			) }
			{ url && (
				<>
					<Position { ...props } url={ url } />
					<Attachment { ...props } />
					<Repeat { ...props } />
					<Size { ...props } />
				</>
			) }
		</>
	);
}
