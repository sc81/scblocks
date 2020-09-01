/**
 * WordPress dependencies
 */
import {
	InspectorControls,
	RichText,
	__experimentalBlock as Block,
} from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { createBlock } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import { selectorsSettings } from './utils';
import { useBlockMemo } from '../../hooks/use-block-memo';
import useDynamicCss from '../../hooks/use-dynamic-css';
import ControlsManager from '../../components/controls-manager';
import { CORE_EDIT_POST_STORE_NAME } from '../../constants';
import { name as blockName } from '.';
import { BLOCK_CLASSES } from '../../block/constants';
import GoogleFontsLink from '../../block/google-fonts-link';

export default function Edit( props ) {
	const { attributes, setAttributes, onReplace } = props;
	const { text, tagName, uidClass } = attributes;

	const devices = useSelect(
		( select ) =>
			select(
				CORE_EDIT_POST_STORE_NAME
			).__experimentalGetPreviewDeviceType(),
		[]
	);
	const blockMemo = useBlockMemo( attributes, selectorsSettings );
	useDynamicCss( props, devices );

	return (
		<>
			<InspectorControls>
				<ControlsManager
					selectorsSettings={ selectorsSettings }
					setAttributes={ setAttributes }
					attributes={ attributes }
					devices={ devices }
					blockMemo={ blockMemo }
					mainControls={
						<PanelBody opened>
							<SelectControl
								label={ __( 'Heading level', 'scblocks' ) }
								value={ tagName }
								options={ [
									{
										label: __( 'H1', 'scblocks' ),
										value: 'h1',
									},
									{
										label: __( 'H2', 'scblocks' ),
										value: 'h2',
									},
									{
										label: __( 'H3', 'scblocks' ),
										value: 'h3',
									},
									{
										label: __( 'H4', 'scblocks' ),
										value: 'h4',
									},
									{
										label: __( 'H5', 'scblocks' ),
										value: 'h5',
									},
									{
										label: __( 'H6', 'scblocks' ),
										value: 'h6',
									},
									{
										label: __( 'p', 'scblocks' ),
										value: 'p',
									},
								] }
								onChange={ ( value ) =>
									setAttributes( { tagName: value } )
								}
							/>
						</PanelBody>
					}
				/>
			</InspectorControls>
			<GoogleFontsLink attributes={ attributes } />
			<RichText
				tagName={ Block[ tagName ] }
				className={ `${ BLOCK_CLASSES.heading.main } ${ uidClass }` }
				value={ text }
				onChange={ ( value ) => setAttributes( { text: value } ) }
				placeholder={ __( 'Heading', 'scblocks' ) }
				onSplit={ ( value ) => {
					if ( ! value ) {
						return createBlock( 'core/paragraph' );
					}

					return createBlock( blockName, {
						...attributes,
						text: value,
					} );
				} }
				onReplace={ onReplace }
			/>
		</>
	);
}
