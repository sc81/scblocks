/**
 * WordPress dependencies
 */
import { useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { ALL_DEVICES } from '../../constants';
import Normal from './normal';
import Hover from './hover';
import NormalHoverButtons from '../../components/normal-hover-buttons/index';
import Transition from '../transition';

export default function Background( props ) {
	const { selector, isBgOverlay } = props;

	const [ isHover, setIsHover ] = useState( false );

	return (
		<>
			<div>
				<NormalHoverButtons
					isHover={ isHover }
					onChange={ ( value ) => setIsHover( value ) }
				/>
			</div>
			{ ! isHover && <Normal { ...props } /> }
			{ isHover && (
				<>
					<Hover
						{ ...props }
						selector={ selector + ':hover' }
						devices={ ALL_DEVICES }
						isBgOverlay={ isBgOverlay }
					/>
					<Transition
						{ ...props }
						devices={ ALL_DEVICES }
						transitionProps={ [
							'background',
							'opacity',
							'filter',
						] }
					/>
				</>
			) }
		</>
	);
}
