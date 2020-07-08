/**
 * WordPress dependencies
 */
import { Button, ButtonGroup } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { PLUGIN_NAME } from '../../constants';
import {
	getPropertiesValue,
	setPropValue,
	setPropsAndSettings,
} from '../../utils';
import NumberUnit from '../../components/number-unit';

export function HorizontalControls( {
	attributes,
	setAttributes,
	devices,
	selector,
} ) {
	const { right, left } = getPropertiesValue( {
		attributes,
		devices,
		selector,
		props: [ 'right', 'left' ],
	} );
	/* eslint-disable no-nested-ternary */
	const [ startingEdge, setStartingEdge ] = useState(
		right ? 'right' : left ? 'left' : 'right'
	);
	/* eslint-enable no-nested-ternary */
	const [ lastRight, setLastRight ] = useState( right );
	const [ lastLeft, setLastLeft ] = useState( left );

	function onClickButton( value ) {
		setStartingEdge( value );
		setPropsAndSettings( {
			attributes,
			setAttributes,
			devices,
			selector,
			props: {
				right: value === 'right' ? lastRight : '',
				left: value === 'left' ? lastLeft : '',
			},
		} );
	}
	function onChange( value ) {
		let propName;
		if ( startingEdge === 'right' ) {
			propName = 'right';
			setLastRight( value );
		} else {
			propName = 'left';
			setLastLeft( value );
		}
		setPropValue( {
			attributes,
			setAttributes,
			devices,
			selector,
			propName,
			value,
		} );
	}

	return (
		<>
			<div className={ `${ PLUGIN_NAME }-label-with-inline-buttons` }>
				<div>{ __( 'Start from' ) }</div>
				<ButtonGroup>
					<Button
						type="button"
						isSmall
						isPrimary={ startingEdge === 'left' }
						aria-pressed={ startingEdge === 'left' }
						onClick={ () => onClickButton( 'left' ) }
					>
						{ __( 'Left' ) }
					</Button>
					<Button
						type="button"
						isSmall
						isPrimary={ startingEdge === 'right' }
						aria-pressed={ startingEdge === 'right' }
						onClick={ () => onClickButton( 'right' ) }
					>
						{ __( 'Right' ) }
					</Button>
				</ButtonGroup>
			</div>
			<NumberUnit
				label={ __( 'Move' ) }
				value={ startingEdge === 'right' ? right : left }
				units={ [ 'px', 'vh', 'vw', '%' ] }
				onChange={ onChange }
				unitRangeStep={ {
					px: {
						min: -1000,
						max: 1000,
					},
				} }
			/>
		</>
	);
}
