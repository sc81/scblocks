/**
 * Internal dependencies
 */
import usePanelActiveControl from '../../hooks/use-panel-active-control';
import Zindex from '../z-index';
import Visibility from '../visibility';
import Position from '../position';
import Order from '../order';

const placementProps = [ 'position', 'zIndex', 'visibility', 'order' ];

export default function Placement( props ) {
	const { position, zIndex, visibility, order } = usePanelActiveControl(
		props.selectorSettings,
		placementProps,
		'placement'
	);

	return (
		<>
			{ position && <Position { ...props } /> }
			{ zIndex && <Zindex { ...props } /> }
			{ order && <Order { ...props } /> }
			{ visibility && <Visibility { ...props } /> }
		</>
	);
}
