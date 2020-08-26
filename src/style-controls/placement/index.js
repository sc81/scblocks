import usePanelActiveControl from '../../hooks/use-panel-active-control';
import Zindex from '../z-index';
import Visibility from '../visibility';
import Position from '../position';

const placementProps = [ 'position', 'zIndex', 'visibility' ];

export default function Placement( props ) {
	const { position, zIndex, visibility } = usePanelActiveControl(
		props.selectorSettings,
		placementProps,
		'placement'
	);

	return (
		<>
			{ position && <Position { ...props } /> }
			{ zIndex && <Zindex { ...props } /> }
			{ visibility && <Visibility { ...props } /> }
		</>
	);
}
