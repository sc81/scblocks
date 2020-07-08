/**
 * WordPress dependencies
 */
import { useMemo } from '@wordpress/element';

/**
 * Internal dependencies
 */
import Filter from '../filter';
import BlendMode from '../blend-mode';
import AlignItems from '../align-items';

export default function Others( props ) {
	const { filter, blendMode, alignItems } = useMemo( () => {
		const state = {
			filter: true,
			blendMode: true,
			alignItems,
		};
		const { spaceAllowedControls } = props.selectorSettings;
		if ( spaceAllowedControls ) {
			for ( const name in state ) {
				if (
					spaceAllowedControls.findIndex( ( n ) => n === name ) === -1
				) {
					state[ name ] = false;
				}
			}
		}
		return state;
	}, [ props.selectorSettings ] );
	return (
		<>
			{ alignItems && <AlignItems { ...props } /> }
			{ filter && <Filter { ...props } /> }
			{ blendMode && <BlendMode { ...props } /> }
		</>
	);
}
