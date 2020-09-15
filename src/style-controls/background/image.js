/**
 * External dependencies
 */
import { isEmpty } from 'lodash';

/**
 * WordPress dependencies
 */
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { setPropsValue, getPropValue } from '../../utils';
import { PLUGIN_NAME } from '../../constants';
import { names } from './constants';
import Position from './position';
import Size from './size';
import Repeat from './repeat';
import Attachment from './attachment';
import ControlWrapper from '../../components/control-wrapper';
import {
	setCssMemoValue,
	setMemoBackgroundImageId,
} from '../../hooks/use-block-memo';
import retriveUrl from './utils';

const propName = names.image;

export default function Image( props ) {
	const { attributes, setAttributes, devices, selector, blockMemo } = props;
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

	function onSelectMedia( media ) {
		if ( ! media || ! media.url ) {
			return;
		}
		const nextUrl = `url(${ media.url })`;

		setCssMemoValue( blockMemo, setPropsValue, {
			devices,
			selector,
			props: { backgroundImage: nextUrl },
		} );
		setMemoBackgroundImageId( blockMemo, devices, media.id );

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
				[ devices ]: media.id,
			};
		} else {
			nextIds = {
				[ devices ]: media.id,
			};
		}
		setAttributes( {
			backgroundImageIds: nextIds,
		} );
	}
	function onRemoveImage() {
		setCssMemoValue( blockMemo, setPropsValue, {
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
		setMemoBackgroundImageId( blockMemo, devices, '' );

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
									{ url
										? __( 'Edit', 'scblocks' )
										: __( 'Media Library', 'scblocks' ) }
								</Button>
							) }
						/>
					</MediaUploadCheck>
					{ url && (
						<Button
							isSecondary
							isSmall
							onClick={ () => onRemoveImage() }
						>
							{ __( 'Remove', 'scblocks' ) }
						</Button>
					) }
				</div>
			</ControlWrapper>
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
