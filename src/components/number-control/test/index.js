/**
 * External dependencies
 */
import { render } from '@testing-library/react';
/**
 * Internal dependencies
 */
import NumberControl from '..';

function getSelectDevices( container ) {
	return container.querySelector( '.components-dropdown-menu' );
}
function getButton( container ) {
	return container.querySelector( 'button' );
}

describe( 'NumberControl', () => {  
	it( 'should not display the select devices when the withoutSelectDevices prop is set', () => {
		const {
			container: { firstChild: numberControlContainer },
		} = render( <NumberControl withoutSelectDevices /> );
		expect( getSelectDevices( numberControlContainer ) ).toBeFalsy();
    } );
    
	it( 'should display the clear button when the value prop is not empty', () => {
		const {
			container: { firstChild: numberControlContainer },
		} = render(
			<NumberControl withoutSelectDevices value="1" />
		);
		expect( getButton( numberControlContainer ) ).toBeTruthy();
    } );
    
	it( 'should not display the clear button when the value prop is empty', () => {
		const {
			container: { firstChild: numberControlContainer },
		} = render( <NumberControl withoutSelectDevices value="" /> );
		expect( getButton( numberControlContainer ) ).toBeFalsy();
    } );

} );
