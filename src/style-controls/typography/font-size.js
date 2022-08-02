/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * ScBlocks dependencies
 */
import { NumberUnit } from '@scblocks/components';

export default function FontSize( props ) {
	return (
		<NumberUnit
			{ ...props }
			label={ __( 'Font Size', 'scblocks' ) }
			units={ [ 'px', 'em', 'rem', 'vw' ] }
			isClearButton
			unitRangeStep={ {
				vw: {
					min: 0,
					max: 20,
					step: 0.1,
				},
			} }
		/>
	);
}
