/**
 * WordPress dependencies
 */
import { useMemo } from '@wordpress/element';

export default function useRelatedSelectorProps( selectorSettings, props ) {
	const propSelector = useMemo( () => {
		const { selector } = selectorSettings;
		const state = {};
		props.forEach( ( prop ) => ( state[ prop ] = selector ) );

		if ( selectorSettings.relatedSelectorProps ) {
			selectorSettings.relatedSelectorProps.props.forEach( ( name ) => {
				if ( state[ name ] ) {
					state[ name ] =
						selectorSettings.relatedSelectorProps.selector;
				}
			} );
		}
		return state;
	}, [ selectorSettings, props ] );

	return propSelector;
}
