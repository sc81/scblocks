import { PLUGIN_NAME } from '../../constants';

export default function SelectWithOptgroup( {
	label,
	value,
	onChange,
	optgroups,
} ) {
	function printOptgroup( optgroup, optgKey ) {
		if ( ! optgroup.options.length ) {
			return null;
		}
		return (
			<optgroup key={ optgKey } label={ optgroup.label }>
				{ optgroup.options.map( ( option, index ) => {
					return (
						<option key={ index } value={ option.value }>
							{ option.label }
						</option>
					);
				} ) }
			</optgroup>
		);
	}
	function onChangeValue( event ) {
		onChange( event.target.value );
	}
	/* eslint-disable jsx-a11y/no-onchange */
	return (
		<div
			className={ `components-base-control ${ PLUGIN_NAME }-select-control` }
		>
			<div className="components-base-control__field">
				<span className="components-base-control__field">
					{ label }
				</span>
				<select
					className="components-select-control__input"
					value={ value }
					onChange={ onChangeValue }
				>
					{ optgroups.map( ( optgroup, index ) =>
						printOptgroup( optgroup, index )
					) }
				</select>
			</div>
		</div>
	);
	/* eslint-enable jsx-a11y/no-onchange */
}
