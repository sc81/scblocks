/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import propertyService from '../property-service';
import NumberControl from '../../components/number-control';

export default function Order( props ) {
	let { selector } = props;
	const orderSelector =
		props.selectorSettings.allowedPanels.placement.order.selector;
	selector =
		( typeof orderSelector === 'string' && orderSelector ) || selector;

	const { propValue, onChange } = propertyService( {
		...props,
		propName: 'order',
		selector,
	} );
	return (
		<NumberControl
			label={ __( 'Order', 'scblocks' ) }
			value={ propValue }
			onChange={ onChange }
			min={ -50 }
			max={ 50 }
		/>
	);
}
