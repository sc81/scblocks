/**
 * External dependencies
 */
import { render } from '@testing-library/react';
/**
 * Internal dependencies
 */
import { PLUGIN_NAME } from '../../../constants';
import ControlWrapper from '..';

function getSelectDevices( container ) {
	return container.querySelector( '.components-dropdown-menu' );
}
function getHeader( container ) {
	return container.querySelector(
		`.${ PLUGIN_NAME }-control-wrapper-header`
	);
}
function getButton( container ) {
	return container.querySelector( 'button' );
}

describe( 'ControlWrapper', () => {
	it( 'should display the header when the withoutHeader prop is not set', () => {
		const {
			container: { firstChild: controlWrapperContainer },
		} = render( <ControlWrapper withoutSelectDevices /> );
		expect( getHeader( controlWrapperContainer ) ).toBeTruthy();
	} );

	it( 'should not display the header when the withoutHeader prop is set', () => {
		const {
			container: { firstChild: controlWrapperContainer },
		} = render( <ControlWrapper withoutSelectDevices withoutHeader /> );
		expect( getHeader( controlWrapperContainer ) ).toBeFalsy();
	} );

	it( 'should not display the select devices when the withoutSelectDevices prop is set', () => {
		const {
			container: { firstChild: controlWrapperContainer },
		} = render( <ControlWrapper withoutSelectDevices /> );
		expect( getSelectDevices( controlWrapperContainer ) ).toBeFalsy();
	} );

	it( 'should display the clear button when the displayClearButton prop is set', () => {
		const {
			container: { firstChild: controlWrapperContainer },
		} = render(
			<ControlWrapper withoutSelectDevices displayClearButton />
		);
		expect( getButton( controlWrapperContainer ) ).toBeTruthy();
	} );

	it( 'should not display the clear button when the displayClearButton prop is not set', () => {
		const {
			container: { firstChild: controlWrapperContainer },
		} = render( <ControlWrapper withoutSelectDevices /> );
		expect( getButton( controlWrapperContainer ) ).toBeFalsy();
	} );

	it( 'should add the display-inline class when the displayInline prop is set', () => {
		const { container } = render(
			<ControlWrapper withoutSelectDevices displayInline />
		);

		expect(
			container.querySelector(
				`.${ PLUGIN_NAME }-control-wrapper.display-inline`
			)
		).toBeTruthy();
	} );
} );
