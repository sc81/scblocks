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
import { Divider } from './divider';

export default function ShapeDividers( props ) {
	const [ isTop, setIsTop ] = useState( true );

	return (
		<>
			<div>
				<ButtonGroup className={ `${ PLUGIN_NAME }-button-group two` }>
					<Button
						isSmall
						isSecondary={ isTop }
						aria-pressed={ isTop }
						onClick={ () => setIsTop( true ) }
					>
						<span>{ __( 'Top' ) }</span>
					</Button>
					<Button
						isSmall
						isSecondary={ ! isTop }
						aria-pressed={ ! isTop }
						onClick={ () => setIsTop( false ) }
					>
						<span>{ __( 'Bottom' ) }</span>
					</Button>
				</ButtonGroup>
			</div>
			{ isTop && (
				<Divider
					{ ...props }
					selector={ `.${ PLUGIN_NAME }-shape-top` }
					isTop
				/>
			) }
			{ ! isTop && (
				<Divider
					{ ...props }
					selector={ `.${ PLUGIN_NAME }-shape-bottom` }
				/>
			) }
		</>
	);
}
