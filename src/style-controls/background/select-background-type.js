/**
 * WordPress dependencies
 */
import { Button, ButtonGroup } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { IMAGE_BACKGROUND_TYPE, GRADIENT_BACKGROUND_TYPE } from './constants';

export default function SelectBackgroundType( { backgroundType, onChange } ) {
	function onClickImageButton() {
		let value = '';
		if ( backgroundType !== IMAGE_BACKGROUND_TYPE ) {
			value = IMAGE_BACKGROUND_TYPE;
		}
		onChange( value );
	}
	function onClickGradientButton() {
		let value = '';
		if ( backgroundType !== GRADIENT_BACKGROUND_TYPE ) {
			value = GRADIENT_BACKGROUND_TYPE;
		}
		onChange( value );
	}
	return (
		<ButtonGroup>
			<Button
				type="button"
				isSmall
				isPrimary={ backgroundType === IMAGE_BACKGROUND_TYPE }
				aria-pressed={ backgroundType === IMAGE_BACKGROUND_TYPE }
				onClick={ onClickImageButton }
			>
				{ __( 'Image', 'scblocks' ) }
			</Button>
			<Button
				type="button"
				isSmall
				isPrimary={ backgroundType === GRADIENT_BACKGROUND_TYPE }
				aria-pressed={ backgroundType === GRADIENT_BACKGROUND_TYPE }
				onClick={ onClickGradientButton }
			>
				{ __( 'Gradient', 'scblocks' ) }
			</Button>
		</ButtonGroup>
	);
}
