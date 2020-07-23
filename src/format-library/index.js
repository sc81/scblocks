/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { toggleFormat, registerFormatType } from '@wordpress/rich-text';
import { RichTextToolbarButton } from '@wordpress/block-editor';
import { Dashicon } from '@wordpress/components';
/**
 * Internal dependencies
 */
import { PLUGIN_NAME } from '../constants';

const icon = <Dashicon icon="edit" />;

const name = `${ PLUGIN_NAME }/mark`;
const title = __( 'Highlight' );

const mark = {
	name,
	title,
	tagName: 'mark',
	className: null,
	edit( { isActive, value, onChange, onFocus } ) {
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
	},
};
registerFormatType( name, mark );
