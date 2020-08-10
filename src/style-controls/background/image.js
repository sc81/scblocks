/**
 * WordPress dependencies
 */
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import {
	setPropsSettings,
	getSelectorSetting,
	getPropValue,
} from '../../utils';
import { PLUGIN_NAME } from '../../constants';
import { names } from './constants';
import Position from './position';
import Size from './size';
import Repeat from './repeat';
import Attachment from './attachment';
import ControlWrapper from '../../components/control-wrapper';
import { setCssMemoValue } from '../../hooks/use-block-memo';
import retriveUrl from './utils';

const propName = names.image;

export default function Image( props ) {
	const { attributes, setAttributes, devices, selector, blockMemo } = props;

	const id = getSelectorSetting( {
		attributes,
		devices,
		selector,
		propName,
	} );
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

		setCssMemoValue( blockMemo, setPropsSettings, {
			devices,
			selector,
			props: { backgroundImage: nextUrl },
			settings: {
				backgroundImage: media.id,
			},
		} );

		setPropsSettings( {
			selector,
			devices,
			attributes,
			setAttributes,
			props: {
				backgroundImage: nextUrl,
			},
			settings: {
				backgroundImage: media.id,
			},
		} );
	}
	function onRemoveImage() {
		setCssMemoValue( blockMemo, setPropsSettings, {
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
			settings: {
				backgroundImage: null,
			},
		} );

		setPropsSettings( {
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
			settings: {
				backgroundImage: null,
			},
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
							value={ id || -1 }
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
