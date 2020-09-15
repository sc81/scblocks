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
import { getPropertiesValue, setPropValue, setPropsValue } from '../../utils';
import NumberUnit from '../../components/number-unit';

export function VerticalControls( {
	attributes,
	setAttributes,
	devices,
	selector,
} ) {
	const { top, bottom } = getPropertiesValue( {
		attributes,
		devices,
		selector,
		props: [ 'top', 'bottom' ],
	} );
	/* eslint-disable no-nested-ternary */
	const [ startingEdge, setStartingEdge ] = useState(
		top ? 'top' : bottom ? 'bottom' : 'top'
	);
	/* eslint-enable no-nested-ternary */
	const [ lastTop, setLastTop ] = useState( top );
	const [ lastBottom, setLastBottom ] = useState( bottom );

	function onClickButton( value ) {
		setStartingEdge( value );
		setPropsValue( {
			attributes,
			setAttributes,
			devices,
			selector,
			props: {
				top: value === 'top' ? lastTop : '',
				bottom: value === 'bottom' ? lastBottom : '',
			},
		} );
	}
	function onChange( value ) {
		let propName;
		if ( startingEdge === 'top' ) {
			propName = 'top';
			setLastTop( value );
		} else {
			propName = 'bottom';
			setLastBottom( value );
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
				<div>{ __( 'Start from', 'scblocks' ) }</div>
				<ButtonGroup>
					<Button
						type="button"
						isSmall
						isPrimary={ startingEdge === 'top' }
						aria-pressed={ startingEdge === 'top' }
						onClick={ () => onClickButton( 'top' ) }
					>
						{ __( 'Top', 'scblocks' ) }
					</Button>
					<Button
						type="button"
						isSmall
						isPrimary={ startingEdge === 'bottom' }
						aria-pressed={ startingEdge === 'bottom' }
						onClick={ () => onClickButton( 'bottom' ) }
					>
						{ __( 'Bottom', 'scblocks' ) }
					</Button>
				</ButtonGroup>
			</div>
			<NumberUnit
				label={ __( 'Move', 'scblocks' ) }
				value={ startingEdge === 'top' ? top : bottom }
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
