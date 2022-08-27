/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * ScBlocks dependencies
 */
import { DropdownComponent, propertyService } from '@scblocks/components';

/**
 * Internal dependencies
 */
import BoxShadowControl from '../box-shadow-control';

const propName = 'boxShadow';
const defaultValue = '0px 0px 2px 0px #b1b1b1';

export default function BoxShadow( props ) {
	const { propValue, onChange } = propertyService( {
		...props,
		propName,
	} );

	return (
		<DropdownComponent
			label={ __( 'Box shadow', 'scblocks' ) }
			isClearButton={ !! propValue }
			isIndicator={ !! propValue }
			onClear={ ( onClose ) => {
				onChange();
				onClose();
			} }
			onOpen={ () => {
				if ( ! propValue ) {
					onChange( defaultValue );
				}
			} }
			renderContent={
				<BoxShadowControl value={ propValue } onChange={ onChange } />
			}
		/>
	);
}
