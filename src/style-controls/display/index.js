/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { SelectControl } from '@wordpress/components';
import { applyFilters } from '@wordpress/hooks';
/**
 * ScBlocks dependencies
 */
import { getPropValue, setPropValue } from '@scblocks/css-utils';
import { ControlWrapper } from '@scblocks/components';

const propName = 'display';

const opts = [
	{ label: __( 'Default', 'scblocks' ), value: '' },
	{ label: 'flex', value: 'flex' },
	{
		label: 'inline-flex',
		value: 'inline-flex',
	},
];

export default function Display( props ) {
	const propValue = getPropValue( {
		...props,
		propName,
	} );

	const options = applyFilters(
		'scblocks.displayControl.options',
		opts,
		props.type
	);

	return (
		<ControlWrapper
			label={ __( 'Display', 'scblocks' ) }
			isIndicator={ !! propValue }
			isSelectDevice={ false }
			displayInline
			widerHeader={ 6 }
		>
			<SelectControl
				value={ propValue }
				onChange={ ( value ) => {
					setPropValue( {
						...props,
						propName,
						value,
					} );
				} }
				options={ options }
			/>
		</ControlWrapper>
	);
}
