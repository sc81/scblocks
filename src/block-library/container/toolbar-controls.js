/**
 * WordPress dependencies
 */
import { BlockAlignmentToolbar, BlockControls } from '@wordpress/block-editor';
import { ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * ScBlocks dependencies
 */
import { AlignmentToolbar } from '@scblocks/block';

const icon = (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="20"
		height="20"
		viewBox="0 0 20 20"
	>
		<rect x="6" y="2" width="8" height="16" />
		<rect x="2" y="2" width="1" height="16" />
		<rect x="17" y="2" width="1" height="16" />
	</svg>
);

export default function ToolbarControls( props ) {
	const {
		devices,
		attributes: { align, useThemeContentWidth },
		setAttributes,
	} = props;
	return (
		<>
			<AlignmentToolbar
				{ ...props }
				devices={ devices }
				selector="main"
			/>
			<BlockControls>
				<BlockAlignmentToolbar
					value={ align }
					onChange={ ( value ) => {
						setAttributes( {
							align: value,
						} );
					} }
					controls={ [ 'wide', 'full' ] }
				/>
				<ToolbarGroup>
					<ToolbarButton
						icon={ icon }
						label={ __( 'Use Theme Content Width' ) }
						isActive={ useThemeContentWidth }
						onClick={ () =>
							setAttributes( {
								useThemeContentWidth: ! useThemeContentWidth,
							} )
						}
					/>
				</ToolbarGroup>
			</BlockControls>
		</>
	);
}
