/**
 * WordPress dependencies
 */
import { PanelBody, SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';

/**
 * ScBlocks dependencies
 */
import { SELEKTORY, SelectIcon } from '@scblocks/block';

addFilter(
	'scblocks.heading.mainControls',
	'scblocks/heading/mainControls',
	main
);

function main( controls, props ) {
	const { attributes, setAttributes } = props;
	const { tagName } = attributes;

	return (
		<>
			<PanelBody opened>
				<SelectControl
					label={ __( 'Element', 'scblocks' ) }
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
						{
							label: __( 'div', 'scblocks' ),
							value: 'div',
						},
					] }
					onChange={ ( value ) =>
						setAttributes( { tagName: value } )
					}
				/>
				<SelectIcon
					{ ...props }
					iconSelector={ SELEKTORY.heading.icon.alias }
					iconSvgSelector={ SELEKTORY.heading.iconSvg.alias }
				/>
			</PanelBody>
			{ controls }
		</>
	);
}
