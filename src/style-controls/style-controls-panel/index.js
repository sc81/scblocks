/**
 * WordPress dependencies
 */
import { PanelBody } from '@wordpress/components';
import { applyFilters } from '@wordpress/hooks';

export default function StyleControlsPanel( props ) {
	const {
		panelName,
		onClickPanel,
		openedPanel,
		panelTitle,
		children,
	} = props;
	return (
		<PanelBody
			className={ applyFilters(
				'scblocks.styleControlsPanel.className',
				null,
				props
			) }
			title={ panelTitle }
			onToggle={ () => onClickPanel( panelName ) }
			opened={ openedPanel === panelName }
		>
			{ children }
		</PanelBody>
	);
}
