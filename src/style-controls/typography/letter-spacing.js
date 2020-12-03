/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * ScBlocks dependencies
 */
import { NumberUnit } from '@scblocks/components';

export default function LetterSpacing( props ) {
	return (
		<NumberUnit
			{ ...props }
			label={ __( 'Letter spacing', 'scblocks' ) }
			units={ [ 'px' ] }
			unitRangeStep={ {
				px: {
					min: -5,
					max: 10,
					step: 0.1,
				},
			} }
			displayClearButton
		/>
	);
}
