/**
 * WordPress dependencies
 */
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { setPropsAndSettings, getSelectorSetting } from '../../utils';
import { PLUGIN_NAME } from '../../constants';
import { names } from './constants';

import Position from './position';
import Size from './size';
import Repeat from './repeat';
import Attachment from './attachment';
import ControlWrapper from '../../components/control-wrapper';
import { setCssMemoValue } from '../../hooks/use-block-memo';

const propName = names.image;

export default function Image( props ) {
	const { attributes, setAttributes, devices, selector, blockMemo } = props;

	const imageSettings = getSelectorSetting( {
		attributes,
		devices,
		selector,
		propName,
	} );
	const { url, id } = imageSettings || {};

	function onSelectMedia( media ) {
		if ( ! media || ! media.url ) {
			return;
		}
		const image = `url(${ media.url })`;

		setCssMemoValue( blockMemo, setPropsAndSettings, {
			devices,
			selector,
			props: { [ propName ]: image },
			settings: {
				[ propName ]: {
					url: media.url,
					id: media.id,
				},
			},
		} );

		setPropsAndSettings( {
			selector,
			devices,
			attributes,
			setAttributes,
			props: {
				[ propName ]: image,
			},
			settings: {
				[ propName ]: {
					url: media.url,
					id: media.id,
				},
			},
		} );
	}
	function onRemoveImage() {
		setCssMemoValue( blockMemo, setPropsAndSettings, {
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

		setPropsAndSettings( {
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
			<ControlWrapper label={ __( 'Image' ) } displayInline>
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
										? __( 'Edit image' )
										: __( 'Media Library' ) }
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
							{ __( 'Remove image' ) }
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
