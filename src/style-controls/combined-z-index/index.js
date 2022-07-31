import Zindex from '../z-index';

export default function CombinedZindex( props ) {
	const { selectorSettings } = props;
	const controls = selectorSettings.panels.position.controls.combinedZindex;
	return controls.map( ( control, index ) => {
		return (
			<Zindex
				{ ...props }
				key={ index }
				label={ control.label }
				selector={ control.selector }
			/>
		);
	} );
}
