/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { toggleFormat, registerFormatType } from '@wordpress/rich-text';
import { RichTextToolbarButton } from '@wordpress/block-editor';
import { Dashicon } from '@wordpress/components';
import { useSelect } from '@wordpress/data';

/**
 * ScBlocks dependencies
 */
import { PLUGIN_NAME, CORE_BLOCK_EDITOR_STORE_NAME } from '@scblocks/constants';

/**
 * Internal dependencies
 */
import { HEADING_BLOCK_NAME } from './utils';

const icon = <Dashicon icon="edit" />;

const name = `${ PLUGIN_NAME }/mark`;
const title = __( 'Highlight', 'scblocks' );

function MarkFormat( { isActive, value, onChange, onFocus } ) {
	const isHeading = useSelect( ( select ) => {
		const selectedBlock = select(
			CORE_BLOCK_EDITOR_STORE_NAME
		).getSelectedBlock();
		return selectedBlock && HEADING_BLOCK_NAME === selectedBlock.name;
	}, [] );

	if ( ! isHeading ) {
		return null;
	}

	function onToggle() {
		onChange( toggleFormat( value, { type: name } ) );
	}

	function onClick() {
		onToggle();
		onFocus();
	}

	return (
		<RichTextToolbarButton
			icon={ icon }
			title={ title }
			onClick={ onClick }
			isActive={ isActive }
		/>
	);
}

const mark = {
	name,
	title,
	tagName: 'mark',
	className: null,
	edit: MarkFormat,
};
registerFormatType( name, mark );
