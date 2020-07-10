/**
 * WordPress dependencies
 */
import { useSelect } from '@wordpress/data';
import { InnerBlocks, InspectorControls } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { BUTTONS_CLASS, selectors } from './utils';
import { PLUGIN_NAME, STORE_NAME } from '../../constants';
import useDynamicCss from '../../hooks/use-dynamic-css';
import ControlsManager from '../../components/controls-manager';
import { useBlockMemo } from '../../hooks/use-block-memo';

const ALLOWED_BLOCKS = [ `${ PLUGIN_NAME }/button` ];
const BUTTONS_TEMPLATE = [ [ `${ PLUGIN_NAME }/button` ] ];

export default function Edit( props ) {
	const { attributes, setAttributes } = props;
	const devices = useSelect(
		( store ) => store( STORE_NAME ).getCurrentDevices(),
		[]
	);
	const blockMemo = useBlockMemo( attributes, selectors );
	useDynamicCss( props, selectors, devices );

	return (
		<>
			<InspectorControls>
				<ControlsManager
					selectors={ selectors }
					setAttributes={ setAttributes }
					attributes={ attributes }
					devices={ devices }
					blockMemo={ blockMemo }
				/>
			</InspectorControls>
			<div className={ `${ BUTTONS_CLASS } ${ attributes.uidClass }` }>
				<InnerBlocks
					allowedBlocks={ ALLOWED_BLOCKS }
					template={ BUTTONS_TEMPLATE }
				/>
			</div>
		</>
	);
}
