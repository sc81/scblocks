import usePanelActiveControl from '../../hooks/use-panel-active-control';
import useRelatedSelectorProps from '../../hooks/use-related-selector-props';
import Zindex from '../z-index';
import Visibility from '../visibility';
import Position from '../position';

const placementProps = [ 'position', 'zIndex', 'visibility' ];

export default function Placement( props ) {
	const { selectorSettings } = props;
	const { position, zIndex, visibility } = usePanelActiveControl(
		selectorSettings,
		placementProps,
		'placement'
	);

	const propSelector = useRelatedSelectorProps(
		selectorSettings,
		placementProps
	);

	return (
		<>
			{ position && (
				<Position { ...props } selector={ propSelector.position } />
			) }
			{ zIndex && (
				<Zindex { ...props } selector={ propSelector.zIndex } />
			) }
			{ visibility && (
				<Visibility { ...props } selector={ propSelector.visibility } />
			) }
		</>
	);
}
