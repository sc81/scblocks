/**
 * WordPress dependencies
 */
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { setSelectorSettings, getSelectorSetting } from '../../utils';
import { PLUGIN_NAME } from '../../constants';
import { names } from './constants';
import ControlWrapper from '../../components/control-wrapper';
import { setCssMemoValue } from '../../hooks/use-block-memo';

const propName = names.video;

export default function Video( {
	attributes,
	setAttributes,
	selector,
	devices,
	blockMemo,
} ) {
	const video = getSelectorSetting( {
		attributes,
		selector,
		devices,
		propName,
	} );
	const { id, url } = video || {};

	function onSelectMedia( media ) {
		if ( ! media || ! media.url ) {
			return;
		}
		setCssMemoValue( blockMemo, setSelectorSettings, {
			devices,
			selector,
			propName,
			value: {
				url: media.url,
				id: media.id,
			},
		} );

		setSelectorSettings( {
			devices,
			selector,
			attributes,
			setAttributes,
			propName,
			value: {
				url: media.url,
				id: media.id,
			},
		} );
	}
	function onRemoveVideo() {
		setCssMemoValue( blockMemo, setSelectorSettings, {
			devices,
			selector,
			propName,
			value: {
				url: '',
				id: -1,
			},
		} );

		setSelectorSettings( {
			propName,
			value: null,
			selector,
			devices,
			attributes,
			setAttributes,
		} );
	}

	return (
		<ControlWrapper label={ __( 'Video', 'scblocks' ) } displayInline>
			<div className={ `${ PLUGIN_NAME }-inline-buttons` }>
				<MediaUploadCheck>
					<MediaUpload
						onSelect={ onSelectMedia }
						allowedTypes={ [ 'video' ] }
						value={ id }
						render={ ( { open } ) => (
							<Button
								isSecondary
								isSmall
								className="editor-media-placeholder__button block-editor-media-placeholder__button"
								onClick={ open }
							>
								{ url
									? __( 'Edit video', 'scblocks' )
									: __( 'Media Library', 'scblocks' ) }
							</Button>
						) }
					/>
				</MediaUploadCheck>
				{ url && (
					<Button
						isSecondary
						isSmall
						onClick={ () => onRemoveVideo() }
					>
						{ __( 'Remove video', 'scblocks' ) }
					</Button>
				) }
			</div>
		</ControlWrapper>
	);
}
