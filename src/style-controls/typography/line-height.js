/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * ScBlocks dependencies
 */
import { NumberUnit } from '@scblocks/components';

export default function LineHeight( props ) {
	return (
		<NumberUnit
			{ ...props }
			label={ __( 'Line height', 'scblocks' ) }
			units={ [ 'px', 'em' ] }
			isClearButton
		/>
	);
}
