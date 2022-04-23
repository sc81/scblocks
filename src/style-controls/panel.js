/**
 * WordPress dependencies
 */
import { G, Path, SVG, Button } from '@wordpress/components';

export default function Panel( {
	name,
	label,
	children,
	openedPanel,
	onClickPanel,
	panelCount,
} ) {
	if ( panelCount === 1 ) {
		return (
			<div className={ 'scblocks-components-panel-body-inner' }>
				{ children }
			</div>
		);
	}
	return (
		<div className="components-panel__body">
			<h2 className="components-panel__body-title">
				<Button
					className="components-panel__body-toggle"
					onClick={ () => onClickPanel( name ) }
					aria-expanded={ openedPanel === name }
				>
					{ /*
						Firefox + NVDA don't announce aria-expanded because the browser
						repaints the whole element, so this wrapping span hides that.
					*/ }
					<span aria-hidden="true">
						{ openedPanel === name ? (
							<SVG
								className="components-panel__arrow"
								width="24px"
								height="24px"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<G>
									<Path fill="none" d="M0,0h24v24H0V0z" />
								</G>
								<G>
									<Path d="M12,8l-6,6l1.41,1.41L12,10.83l4.59,4.58L18,14L12,8z" />
								</G>
							</SVG>
						) : (
							<SVG
								className="components-panel__arrow"
								width="24px"
								height="24px"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<G>
									<Path fill="none" d="M0,0h24v24H0V0z" />
								</G>
								<G>
									<Path d="M7.41,8.59L12,13.17l4.59-4.58L18,10l-6,6l-6-6L7.41,8.59z" />
								</G>
							</SVG>
						) }
					</span>
					{ label }
				</Button>
			</h2>
			{ openedPanel === name && (
				<div className={ 'scblocks-components-panel-body-inner' }>
					{ children }
				</div>
			) }
		</div>
	);
}
