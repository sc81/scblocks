/**
 * External dependencies
 */
import { isEmpty } from 'lodash';

/**
 * WordPress dependencies
 */
import { Button, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';

/**
 * ScBlocks dependencies
 */
import { getPropValue, setPropsValue } from '@scblocks/css-utils';
import { PLUGIN_NAME } from '@scblocks/constants';
import { ControlWrapper } from '@scblocks/components';

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
	const { backgroundImageIds } = attributes;
	const id =
		backgroundImageIds && backgroundImageIds[ devices ]
			? backgroundImageIds[ devices ]
			: -1;

	const backgroundImage = getPropValue( {
		attributes,
		devices,
		selector,
		propName,
	} );
	const url = retriveUrl( backgroundImage );

	function setImage( nextUrl, nextId ) {
		nextUrl = `url(${ nextUrl })`;

		setPropsValue( {
			selector,
			devices,
			attributes,
			setAttributes,
			props: {
				backgroundImage: nextUrl,
			},
		} );
		let nextIds;
		if ( backgroundImageIds ) {
			nextIds = {
				...backgroundImageIds,
				[ devices ]: nextId,
			};
		} else {
			nextIds = {
				[ devices ]: nextId,
			};
		}
		setAttributes( {
			backgroundImageIds: nextIds,
		} );
	}

	function onSelectMedia( media ) {
		if ( ! media || ! media.url ) {
			return;
		}
		setImage( media.url, media.id );
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
				opacity: '',
			},
		} );
		let nextIds = { ...backgroundImageIds };
		delete nextIds[ devices ];
		if ( isEmpty( nextIds ) ) {
			nextIds = null;
		}
		setAttributes( {
			backgroundImageIds: nextIds,
		} );
	}
	function onChangeUrl( value ) {
		if ( value ) {
			setImage( value );
		} else {
			removeImage();
		}
	}

	return (
		<>
			<ControlWrapper label={ __( 'Image', 'scblocks' ) } displayInline>
				<div className={ `${ PLUGIN_NAME }-inline-buttons` }>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={ onSelectMedia }
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
				label={ __( 'URL', 'scblocks' ) }
				value={ url }
				onChange={ onChangeUrl }
				autocomplete="off"
			/>
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
