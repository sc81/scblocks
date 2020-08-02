/**
 * External dependencies
 */
import { render } from '@testing-library/react';
/**
 * Internal dependencies
 */
import NumberUnit from '..';

function getSelectDevices( container ) {
	return container.querySelector( '.components-dropdown-menu' );
}
function getButton( container ) {
	return container.querySelector( 'button' );
}

describe( 'NumberUnit', () => {
	it( 'should not display the select devices when the withoutSelectDevices prop is set', () => {
		const {
			container: { firstChild: numberUnitContainer },
		} = render( <NumberUnit withoutSelectDevices units={ [ 'px' ] } /> );
		expect( getSelectDevices( numberUnitContainer ) ).toBeFalsy();
	} );

	it( 'should display clear button when the value prop is not empty and displayClearButton prop is set', () => {
		const {
			container: { firstChild: numberUnitContainer },
		} = render(
			<NumberUnit
				displayClearButton
				withoutSelectDevices
				value="1px"
				units={ [ 'px' ] }
			/>
		);
		expect( getButton( numberUnitContainer ) ).toBeTruthy();
	} );

	it( 'should not display clear button when displayClearButton prop is not set even when the value prop is not empty', () => {
		const {
			container: { firstChild: numberUnitContainer },
		} = render(
			<NumberUnit withoutSelectDevices value="1px" units={ [ 'px' ] } />
		);
		expect( getButton( numberUnitContainer ) ).toBeFalsy();
	} );

	it( 'should display a dropdown', () => {
		const {
			container: { firstChild: numberUnitContainer },
		} = render(
			<NumberUnit withoutSelectDevices units={ [ 'px', 'em' ] } />
		);
		const dropdown = numberUnitContainer.querySelector(
			'.components-dropdown-menu'
		);
		expect( dropdown ).toBeTruthy();
	} );

	it( 'should not display a dropdown when there is only one unit', () => {
		const {
			container: { firstChild: numberUnitContainer },
		} = render( <NumberUnit withoutSelectDevices units={ [ 'px' ] } /> );
		const dropdown = numberUnitContainer.querySelector(
			'.components-dropdown-menu'
		);
		expect( dropdown ).toBeFalsy();
	} );

	it( 'should not display a slider', () => {
		const {
			container: { firstChild: numberUnitContainer },
		} = render(
			<NumberUnit withoutSelectDevices withoutSlider units={ [ 'px' ] } />
		);
		const slider = numberUnitContainer.querySelector( 'input[type=range]' );
		expect( slider ).toBeFalsy();
	} );

	it( 'should display a slider', () => {
		const {
			container: { firstChild: numberUnitContainer },
		} = render( <NumberUnit withoutSelectDevices units={ [ 'px' ] } /> );
		const slider = numberUnitContainer.querySelector( 'input[type=range]' );
		expect( slider ).toBeTruthy();
	} );

	it( 'should properly select unit', () => {
		const {
			container: { firstChild: numberUnitContainer },
		} = render(
			<NumberUnit
				withoutSelectDevices
				units={ [ 'px', 'em' ] }
				value="2em"
			/>
		);
		expect( getButton( numberUnitContainer ).textContent ).toMatch( 'em' );
	} );

	it( 'should display the first unit when there is no value', () => {
		const {
			container: { firstChild: numberUnitContainer },
		} = render(
			<NumberUnit
				withoutSelectDevices
				units={ [ 'px', 'em' ] }
				value=""
			/>
		);
		expect( getButton( numberUnitContainer ).textContent ).toMatch( 'px' );
	} );
} );
